import { useState, useCallback, useMemo, useEffect } from 'react';
import type { DataRow, Group } from './types';
import { ArrowLeft } from 'lucide-react';
import Papa from 'papaparse';
import { groupBy } from 'es-toolkit';
import {
  FileUploadArea,
  ColumnSelector,
  GroupingSelector,
  TableControls,
  DataTable,
  NestedTable,
  Pagination,
} from '@/components/common/widget-table';
import { Grid, Spacing } from '@basiln/utils';
import { Button, Text } from '@basiln/design-system';
import { widgetTableCss, widgetTablePageHeaderCss } from './styles';
import { ViewModeSelector } from '@/components/common/widget-table/ViewModeSelector';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

export const TableWidgetPage = () => {
  const navigate = useNavigate();

  const [headers, setHeaders] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<DataRow[]>([]);

  const [fileName, setFileName] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [
    searchTerm,
    // setSearchTerm
  ] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  // 컬럼 선택 관련 상태
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  // 중첩 구조 관련 상태
  const [groupingColumns, setGroupingColumns] = useState<string[]>([]);

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'table' | 'group'>('table');

  const handleFileUpload = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement> | { target: { files: File[] } }
    ) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        setError('CSV 파일만 업로드할 수 있습니다.');
        return;
      }

      setLoading(true);
      setError('');
      setFileName(file.name);

      Papa.parse(file, {
        complete: (results) => {
          if (results.errors.length > 0) {
            setError('CSV 파일을 읽는 중 오류가 발생했습니다.');
            setLoading(false);
            return;
          }

          const data = results.data as DataRow[];
          if (data.length === 0) {
            setError('빈 파일입니다.');
            setLoading(false);
            return;
          }

          const headerRow = (data[0] as DataRow).map((header) =>
            typeof header === 'string' ? header.trim() : String(header)
          );
          setHeaders(headerRow);
          setSelectedColumns(headerRow);

          const dataRows = data
            .slice(1)
            .filter((row: DataRow) =>
              row.some(
                (cell) => cell !== null && cell !== undefined && cell !== ''
              )
            );
          setCsvData(dataRows);
          setCurrentPage(1);
          setGroupingColumns([]);
          setExpandedGroups(new Set());
          setLoading(false);
        },
        header: false,
        skipEmptyLines: true,
        dynamicTyping: true,
        encoding: 'UTF-8',
      });
    },
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
        const fakeEvent = { target: { files: [file] } };
        handleFileUpload(fakeEvent);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  // 선택된 컬럼만 필터링된 데이터
  const filteredByColumns = useMemo(() => {
    if (selectedColumns.length === 0) return [];

    const selectedIndices = selectedColumns
      .map((col) => headers.indexOf(col))
      .filter((idx) => idx !== -1);

    return csvData.map((row) => selectedIndices.map((idx) => row[idx]));
  }, [csvData, selectedColumns, headers]);

  // 검색 필터링
  const searchFilteredData = useMemo(() => {
    if (!searchTerm) return filteredByColumns;

    return filteredByColumns.filter((row) =>
      row.some((cell) =>
        String(cell || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [filteredByColumns, searchTerm]);

  // 중첩 구조 데이터 생성
  const nestedData = useMemo(() => {
    if (groupingColumns.length === 0 || searchFilteredData.length === 0) {
      return searchFilteredData;
    }

    const groupingIndices = groupingColumns
      .map((col) => selectedColumns.indexOf(col))
      .filter((idx) => idx !== -1);

    // 계층적 그룹핑 함수
    function createNestedStructure(
      data: DataRow[],
      depth: number = 0
    ): Group[] {
      if (depth >= groupingIndices.length) {
        return data.map((row) => ({
          groupKey: '',
          groupColumn: '',
          groupValue: '',
          groupPath: '',
          items: [row],
          isGroup: true,
          depth,
          totalItems: 1,
        }));
      }

      const currentGroupIndex = groupingIndices[depth];
      const grouped = groupBy(data, (row: DataRow) =>
        String(row[currentGroupIndex])
      );

      return Object.entries(grouped).map(([key, items]) => {
        const itemsArr = items as DataRow[];
        const subGroups = createNestedStructure(itemsArr, depth + 1);
        return {
          groupKey: key,
          groupColumn: groupingColumns[depth],
          groupValue: key,
          groupPath: groupingColumns
            .slice(0, depth + 1)
            .map((_, idx) =>
              itemsArr[0] ? String(itemsArr[0][groupingIndices[idx]]) : ''
            )
            .join(' → '),
          items: subGroups,
          isGroup: true,
          depth,
          totalItems: subGroups.reduce(
            (acc, item) => acc + (item.totalItems || 1),
            0
          ),
        };
      });
    }
    return createNestedStructure(searchFilteredData as DataRow[]);
  }, [searchFilteredData, groupingColumns, selectedColumns]);

  // 정렬
  const sortedData = useMemo(() => {
    if (!sortConfig.key)
      return viewMode === 'group'
        ? (nestedData as Group[])
        : (searchFilteredData as DataRow[]);

    if (viewMode === 'group') {
      return [...(nestedData as Group[])].sort((a: Group, b: Group) => {
        const aVal = a.groupKey;
        const bVal = b.groupKey;
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const columnIndex = selectedColumns.indexOf(sortConfig.key);
    if (columnIndex === -1) return searchFilteredData as DataRow[];

    return [...(searchFilteredData as DataRow[])].sort(
      (a: DataRow, b: DataRow) => {
        const aVal = a[columnIndex] || '';
        const bVal = b[columnIndex] || '';
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      }
    );
  }, [searchFilteredData, nestedData, sortConfig, selectedColumns, viewMode]);

  // 페이지네이션
  const totalItems =
    viewMode === 'group'
      ? (sortedData as Group[]).reduce(
          (acc: number, group: Group) =>
            acc + (group.isGroup ? group.items.length : 1),
          0
        )
      : (sortedData as DataRow[]).length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedData = useMemo(() => {
    if (viewMode === 'group') {
      return sortedData as Group[]; // 중첩 뷰에서는 전체 그룹 표시
    }
    return (sortedData as DataRow[]).slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [sortedData, startIndex, itemsPerPage, viewMode]);

  const handleSort = (column: string) => {
    setSortConfig((prev) => ({
      key: column,
      direction:
        prev.key === column && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const toggleColumnSelection = (column: string) => {
    setSelectedColumns((prev) => {
      const newSelection = prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column];

      // 그룹핑 컬럼이 선택 해제되면 그룹핑에서도 제거
      if (!newSelection.includes(column)) {
        setGroupingColumns((prevGrouping) =>
          prevGrouping.filter((col) => col !== column)
        );
      }

      return newSelection;
    });
  };

  const updateGroupingLevel = (level: number, column: string) => {
    setGroupingColumns((prev) => {
      const newGrouping = [...prev];

      if (column === '') {
        // 해당 레벨과 그 이후 레벨들을 모두 제거
        return newGrouping.slice(0, level);
      } else {
        // 새 컬럼 설정 (해당 레벨에 설정하고, 그 이후 레벨들은 제거)
        newGrouping[level] = column;
        const result = newGrouping.slice(0, level + 1);

        setExpandedGroups(new Set()); // 그룹핑 변경 시 모든 그룹 접기
        return result;
      }
    });
  };

  // 모든 그룹 펼치기 함수
  const expandAllGroups = () => {
    const getAllGroupIds = (groups: Group[], parentPath = ''): string[] => {
      let allIds: string[] = [];
      groups.forEach((group) => {
        if (group.isGroup) {
          const groupId = `${parentPath}${group.groupValue}`;
          allIds.push(groupId);
          if (
            Array.isArray(group.items) &&
            (group.items as Group[])[0]?.isGroup
          ) {
            allIds = [
              ...allIds,
              ...getAllGroupIds(group.items as Group[], `${groupId}_`),
            ];
          }
        }
      });
      return allIds;
    };
    const allGroupIds = getAllGroupIds(nestedData as Group[]);
    setExpandedGroups(new Set(allGroupIds));
  };

  // 모든 그룹 접기 함수
  const collapseAllGroups = () => {
    setExpandedGroups(new Set());
  };

  const toggleGroupExpansion = (groupKey: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupKey)) {
        newSet.delete(groupKey);
      } else {
        newSet.add(groupKey);
      }
      return newSet;
    });
  };

  const addWidget = () => {
    console.log({
      columns: headers,
      rows: csvData,
      filterFields: selectedColumns,
      grouping: groupingColumns,
    });

    toast.success('위젯이 추가되었습니다.');
    navigate('/');
  };

  useEffect(() => {
    if (groupingColumns.length === 0 && viewMode === 'group') {
      setViewMode('table');
    }
  }, [groupingColumns, viewMode]);

  // const resetData = () => {
  //   setCsvData([]);
  //   setHeaders([]);
  //   setFileName('');
  //   setError('');
  //   setSearchTerm('');
  //   setCurrentPage(1);
  //   setSortConfig({ key: null, direction: 'asc' });
  //   setSelectedColumns([]);
  //   setGroupingColumns([]);
  //   setExpandedGroups(new Set());
  //   setViewMode('table');
  // };

  return (
    <>
      <header css={widgetTablePageHeaderCss.self}>
        <div css={widgetTablePageHeaderCss.buttonContainer}>
          <Button
            display="inline"
            gutter="10px"
            leftAddon={<ArrowLeft size={14} />}
            radius="small"
            variant="ghost"
            onClick={() => navigate(-1)}
          >
            <Text color="black" size="btn-medium">
              돌아가기
            </Text>
          </Button>

          <Text size="body-large">테이블 만들기</Text>
        </div>
        <Button
          display="inline"
          gutter="20px"
          radius="small"
          css={{ height: 36 }}
          onClick={addWidget}
          disabled={
            headers.length === 0 ||
            csvData.length === 0 ||
            selectedColumns.length === 0
          }
        >
          <Text color="white">저장하기</Text>
        </Button>
      </header>

      <Grid columns="260px 1fr" css={widgetTableCss.container}>
        <Grid.Item css={widgetTableCss.left}>
          <label htmlFor="file-name" css={widgetTableCss.tableNameContainer}>
            <Text css={widgetTableCss.fieldTitle}>테이블 제목</Text>

            <input
              id="file-name"
              css={widgetTableCss.tableNameInput}
              placeholder="새 테이블"
            />
          </label>

          <Spacing size={20} />

          <Text as="p" css={widgetTableCss.fieldTitle}>
            데이터 업로드
          </Text>

          <FileUploadArea
            onFileUpload={handleFileUpload}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            isLoading={loading}
          />
          {error && (
            <Text
              size="caption-regular"
              color="승인오류"
              css={{ position: 'absolute', marginTop: '2px' }}
            >
              {error}
            </Text>
          )}

          <Spacing size={20} />

          <div css={widgetTableCss.separator} />

          <Spacing size={20} />

          <Text as="p" css={widgetTableCss.fieldTitle}>
            테이블 정보
          </Text>

          <TableControls
            fileName={fileName}
            rowCount={csvData.length}
            colCount={selectedColumns.length}
            groupingColumns={groupingColumns}
          />

          <Spacing size={8} />

          <ColumnSelector
            headers={headers}
            selectedColumns={selectedColumns}
            onToggleColumn={toggleColumnSelection}
            onSelectAll={() => setSelectedColumns([...headers])}
            onClearAll={() => setSelectedColumns([])}
          />

          <Spacing size={20} />

          {selectedColumns.length > 0 && (
            <GroupingSelector
              selectedColumns={selectedColumns}
              groupingColumns={groupingColumns}
              onUpdateGrouping={updateGroupingLevel}
              onClearGrouping={() => setGroupingColumns([])}
            />
          )}
        </Grid.Item>

        <Grid.Item css={widgetTableCss.right}>
          <div css={widgetTableCss.previewContainer}>
            {csvData.length > 0 && (
              <ViewModeSelector
                type={viewMode}
                groupingColumns={groupingColumns}
                onTypeChange={setViewMode}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                onCurrentPageChange={setCurrentPage}
                onExpandAllGroups={expandAllGroups}
                onCollapseAllGroups={collapseAllGroups}
              />
            )}

            {csvData.length > 0 && selectedColumns.length > 0 && (
              <>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    {viewMode === 'table' ? (
                      <DataTable
                        selectedColumns={selectedColumns}
                        paginatedData={paginatedData as DataRow[]}
                        sortConfig={sortConfig}
                        onSort={handleSort}
                      />
                    ) : (
                      <NestedTable
                        data={sortedData as Group[]}
                        selectedColumns={selectedColumns}
                        expandedGroups={expandedGroups}
                        onToggleGroup={toggleGroupExpansion}
                      />
                    )}
                  </div>

                  {viewMode === 'table' && totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </Grid.Item>
      </Grid>
    </>
  );
};
