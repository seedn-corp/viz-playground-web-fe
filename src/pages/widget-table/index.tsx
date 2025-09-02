import { useState, useCallback, useMemo } from 'react';
import type { DataRow, Group } from './types';
import { Filter, RefreshCw, Settings, Plus, Minus } from 'lucide-react';
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

export const WidgetTablePage = () => {
  const [headers, setHeaders] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<DataRow[]>([]);

  const [fileName, setFileName] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  // 컬럼 선택 관련 상태
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState<boolean>(false);

  // 중첩 구조 관련 상태
  const [groupingColumns, setGroupingColumns] = useState<string[]>([]);
  const [showGroupingSelector, setShowGroupingSelector] =
    useState<boolean>(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'table' | 'nested'>('table'); // 'table' or 'nested'

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
      return viewMode === 'nested'
        ? (nestedData as Group[])
        : (searchFilteredData as DataRow[]);

    if (viewMode === 'nested') {
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
    viewMode === 'nested'
      ? (sortedData as Group[]).reduce(
          (acc: number, group: Group) =>
            acc + (group.isGroup ? group.items.length : 1),
          0
        )
      : (sortedData as DataRow[]).length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedData = useMemo(() => {
    if (viewMode === 'nested') {
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

  const resetData = () => {
    setCsvData([]);
    setHeaders([]);
    setFileName('');
    setError('');
    setSearchTerm('');
    setCurrentPage(1);
    setSortConfig({ key: null, direction: 'asc' });
    setSelectedColumns([]);
    setGroupingColumns([]);
    setExpandedGroups(new Set());
    setViewMode('table');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">테이블 만들기</div>
        {/* 파일 업로드 영역 컴포넌트 */}
        <FileUploadArea
          onFileUpload={handleFileUpload}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />

        {/* 로딩 상태 */}
        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-center">
              <RefreshCw className="animate-spin h-6 w-6 text-blue-500 mr-2" />
              <span>파일을 처리하고 있습니다...</span>
            </div>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* 컬럼/그룹핑 선택 패널 컴포넌트 */}
        {headers.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Settings className="h-5 w-5" />
                데이터 설정
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowColumnSelector(!showColumnSelector)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  컬럼 선택
                </button>
                <button
                  onClick={() => setShowGroupingSelector(!showGroupingSelector)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  그룹핑 설정
                </button>
                <button
                  onClick={() =>
                    setViewMode(viewMode === 'table' ? 'nested' : 'table')
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'nested'
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {viewMode === 'nested' ? '중첩 뷰' : '테이블 뷰'}
                </button>
                {viewMode === 'nested' && groupingColumns.length > 0 && (
                  <>
                    <button
                      onClick={expandAllGroups}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      모두 펼치기
                    </button>
                    <button
                      onClick={collapseAllGroups}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                      모두 접기
                    </button>
                  </>
                )}
              </div>
            </div>
            {showColumnSelector && (
              <ColumnSelector
                headers={headers}
                selectedColumns={selectedColumns}
                onToggleColumn={toggleColumnSelection}
                onSelectAll={() => setSelectedColumns([...headers])}
                onClearAll={() => setSelectedColumns([])}
              />
            )}
            {showGroupingSelector && selectedColumns.length > 0 && (
              <GroupingSelector
                selectedColumns={selectedColumns}
                groupingColumns={groupingColumns}
                onUpdateGrouping={updateGroupingLevel}
                onClearGrouping={() => setGroupingColumns([])}
              />
            )}
          </div>
        )}

        {/* 데이터가 있을 때의 컨트롤 및 테이블 */}
        {csvData.length > 0 && selectedColumns.length > 0 && (
          <>
            <TableControls
              fileName={fileName}
              rowCount={csvData.length}
              colCount={selectedColumns.length}
              searchTerm={searchTerm}
              onSearch={(term) => {
                setSearchTerm(term);
                setCurrentPage(1);
              }}
              onReset={resetData}
              groupingColumns={groupingColumns}
            />
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
                    sortedData={sortedData as Group[]}
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
    </div>
  );
};
