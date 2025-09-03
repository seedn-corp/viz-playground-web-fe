import { groupBy } from 'es-toolkit';
import { useCallback, useMemo, useState } from 'react';

import { isCSV, parseCsvFileToJson, isExcel, parseXlsxFileToJson } from '@/pages/chart/utils';
import type { DataRow, Group } from '@/pages/table/types';

export function useTableData({ initialItemsPerPage = 10, viewMode = 'table' }) {
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<DataRow[]>([]);

  const [fileName, setFileName] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(initialItemsPerPage);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  // 컬럼 선택 관련 상태
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  // 중첩 구조 관련 상태
  const [groupingColumns, setGroupingColumns] = useState<string[]>([]);

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement> | { target: { files: File[] } }) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setLoading(true);
      setError('');
      setFileName(file.name);

      try {
        let records: Record<string, string>[] = [];

        if (isCSV(file) || file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv')) {
          records = await parseCsvFileToJson(file);
        } else if (isExcel(file)) {
          records = await parseXlsxFileToJson(file);
        } else {
          setError('CSV 또는 Excel(.xls/.xlsx) 파일만 업로드할 수 있습니다.');
          setLoading(false);
          return;
        }

        if (!records || records.length === 0) {
          setError('빈 파일입니다.');
          setLoading(false);
          return;
        }

        const headerRow = Object.keys(records[0]).map((h) =>
          typeof h === 'string' ? h.trim() : String(h),
        );

        setHeaders(headerRow);
        setSelectedColumns(headerRow);

        const dataRows = records.map((rec) =>
          headerRow.map((h) => {
            const v = rec[h];
            if (v === undefined || v === '') return null;
            const n = Number(v);
            return Number.isNaN(n) ? v : n;
          }),
        ) as DataRow[];

        setRows(dataRows);
        setCurrentPage(1);
        setGroupingColumns([]);
        setExpandedGroups(new Set());
      } catch (err) {
        console.error(err);
        setError('파일을 읽는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    },
    [],
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
    [handleFileUpload],
  );

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  // 선택된 컬럼만 필터링된 데이터
  const filteredByColumns = useMemo(() => {
    if (selectedColumns.length === 0) return [];

    const selectedIndices = selectedColumns
      .map((col) => headers.indexOf(col))
      .filter((idx) => idx !== -1);

    return rows.map((row) => selectedIndices.map((idx) => row[idx]));
  }, [rows, selectedColumns, headers]);

  // 검색 필터링
  const searchFilteredData = useMemo(() => {
    if (!searchTerm) return filteredByColumns;

    return filteredByColumns.filter((row) =>
      row.some((cell) =>
        String(cell || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      ),
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
    function createNestedStructure(data: DataRow[], depth: number = 0): Group[] {
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
      const grouped = groupBy(data, (row: DataRow) => String(row[currentGroupIndex]));

      return Object.entries(grouped).map(([key, items]) => {
        const itemsArr = items as DataRow[];
        const subGroups = createNestedStructure(itemsArr, depth + 1);
        return {
          groupKey: key,
          groupColumn: groupingColumns[depth],
          groupValue: key,
          groupPath: groupingColumns
            .slice(0, depth + 1)
            .map((_, idx) => (itemsArr[0] ? String(itemsArr[0][groupingIndices[idx]]) : ''))
            .join(' → '),
          items: subGroups,
          isGroup: true,
          depth,
          totalItems: subGroups.reduce((acc, item) => acc + (item.totalItems || 1), 0),
        };
      });
    }
    return createNestedStructure(searchFilteredData as DataRow[]);
  }, [searchFilteredData, groupingColumns, selectedColumns]);

  // 정렬
  const sortedData = useMemo(() => {
    if (!sortConfig.key)
      return viewMode === 'group' ? (nestedData as Group[]) : (searchFilteredData as DataRow[]);

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

    return [...(searchFilteredData as DataRow[])].sort((a: DataRow, b: DataRow) => {
      const aVal = a[columnIndex] || '';
      const bVal = b[columnIndex] || '';
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [searchFilteredData, nestedData, sortConfig, selectedColumns, viewMode]);

  // 페이지네이션
  const totalItems =
    viewMode === 'group'
      ? (sortedData as Group[]).reduce(
          (acc: number, group: Group) => acc + (group.isGroup ? group.items.length : 1),
          0,
        )
      : (sortedData as DataRow[]).length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedData = useMemo(() => {
    if (viewMode === 'group') {
      return sortedData as Group[]; // 중첩 뷰에서는 전체 그룹 표시
    }
    return (sortedData as DataRow[]).slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, startIndex, itemsPerPage, viewMode]);

  const handleSort = (column: string) => {
    setSortConfig((prev) => ({
      key: column,
      direction: prev.key === column && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const toggleColumnSelection = (column: string) => {
    setSelectedColumns((prev) => {
      const newSelection = prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column];

      // 그룹핑 컬럼이 선택 해제되면 그룹핑에서도 제거
      if (!newSelection.includes(column)) {
        setGroupingColumns((prevGrouping) => prevGrouping.filter((col) => col !== column));
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
          if (Array.isArray(group.items) && (group.items as Group[])[0]?.isGroup) {
            allIds = [...allIds, ...getAllGroupIds(group.items as Group[], `${groupId}_`)];
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

  return {
    headers,
    rows,
    fileName,
    loading,
    error,
    searchTerm,
    currentPage,
    itemsPerPage,
    sortConfig,
    selectedColumns,
    groupingColumns,
    expandedGroups,

    paginatedData,
    totalItems,
    totalPages,
    nestedData,

    setSearchTerm,
    setItemsPerPage,
    setCurrentPage,
    setSelectedColumns,
    setGroupingColumns,

    handleFileUpload,
    handleDrop,
    handleDragOver,
    handleSort,

    toggleColumnSelection,
    updateGroupingLevel,
    expandAllGroups,
    collapseAllGroups,
    toggleGroupExpansion,
  };
}
