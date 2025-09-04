import { Spacing } from '@basiln/utils';
import { useMemo, useState } from 'react';

import { DataTable } from '@/components/table/DataTable';
import { NestedTable } from '@/components/table/NestedTable';
import { Pagination } from '@/components/table/Pagination';
import { ViewModeSelector } from '@/components/table/ViewModeSelector';
import type { DataRow, Group } from '@/pages/table/types';

import type { TablePreviewProps } from './types';

export const TablePreview = ({ processed_data, config }: TablePreviewProps) => {
  let tableData: { columns?: string[]; rows?: DataRow[] } | undefined;
  let tableConfig: { filterFields?: string[]; grouping?: string[] } | undefined;

  try {
    tableData =
      typeof processed_data === 'string'
        ? JSON.parse(processed_data)
        : (processed_data as unknown as { columns?: string[]; rows?: DataRow[] });
  } catch {
    tableData = undefined;
  }

  try {
    tableConfig =
      typeof config === 'string'
        ? JSON.parse(config)
        : (config as unknown as { filterFields?: string[]; grouping?: string[] });
  } catch {
    tableConfig = undefined;
  }

  const allColumns = tableData && Array.isArray(tableData.columns) ? tableData.columns : [];
  const rows = tableData && Array.isArray(tableData.rows) ? tableData.rows : [];

  const filterFields = tableConfig?.filterFields;
  const displayedColumns =
    Array.isArray(filterFields) && filterFields.length > 0
      ? filterFields.filter((f) => allColumns.includes(f))
      : allColumns;

  const [viewMode, setViewMode] = useState<'table' | 'group'>('table');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedGroups, setExpandedGroups] = useState(new Set<string>());
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });

  const sortedRows = useMemo(() => {
    if (!sortConfig.key) return rows;
    const idx = allColumns.indexOf(sortConfig.key as string);
    if (idx === -1) return rows;

    const copy = [...rows];
    copy.sort((a, b) => {
      const va = a?.[idx];
      const vb = b?.[idx];

      if (va == null && vb == null) return 0;
      if (va == null) return sortConfig.direction === 'asc' ? -1 : 1;
      if (vb == null) return sortConfig.direction === 'asc' ? 1 : -1;

      const na = typeof va === 'number' ? va : Number(va);
      const nb = typeof vb === 'number' ? vb : Number(vb);
      const bothNumbers = !Number.isNaN(na) && !Number.isNaN(nb);
      if (bothNumbers) {
        return sortConfig.direction === 'asc' ? na - nb : nb - na;
      }

      const sa = String(va);
      const sb = String(vb);
      return sortConfig.direction === 'asc' ? sa.localeCompare(sb) : sb.localeCompare(sa);
    });

    return copy;
  }, [rows, sortConfig, allColumns]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / itemsPerPage));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const pageRows = sortedRows.slice(start, start + itemsPerPage) as DataRow[];

    if (displayedColumns.length === allColumns.length) {
      return pageRows;
    }

    const colIndices = displayedColumns.map((c) => allColumns.indexOf(c));
    return pageRows.map((r) => colIndices.map((i) => (i >= 0 ? r[i] : undefined)));
  }, [sortedRows, currentPage, itemsPerPage]);

  const groupingCols = tableConfig?.grouping || [];

  const buildGroupedData = (allRows: DataRow[], columnsArr: string[], grouping: string[]) => {
    const colIndex = (colName: string) => columnsArr.indexOf(colName);

    const buildLevel = (
      rowsAtLevel: DataRow[],
      level: number,
      parentPath = '',
      depth = 0,
    ): Group[] | DataRow[] => {
      if (level >= grouping.length) return rowsAtLevel;

      const groupByIdx = colIndex(grouping[level]);
      const map = new Map<string, DataRow[]>();

      for (const r of rowsAtLevel) {
        const key = String(r[groupByIdx] ?? '');
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(r);
      }

      const groups: Group[] = [];
      for (const [groupValue, groupRows] of map.entries()) {
        const path = parentPath ? `${parentPath}_${groupValue}` : String(groupValue);
        const items = buildLevel(groupRows, level + 1, path, depth + 1);

        // Compute totalItems robustly
        let totalItems = 0;
        if (Array.isArray(items)) {
          if (items.length === 0) {
            totalItems = 0;
          } else {
            const first = items[0];
            if (Array.isArray(first)) {
              totalItems = (items as DataRow[]).length;
            } else {
              totalItems = (items as Group[]).reduce((acc, g) => {
                if (typeof g.totalItems === 'number') return acc + g.totalItems;
                if (Array.isArray(g.items)) {
                  const maybeFirst = (g.items as unknown as unknown[])[0];
                  if (Array.isArray(maybeFirst)) return acc + (g.items as DataRow[]).length;
                }
                return acc;
              }, 0);
            }
          }
        }

        groups.push({
          groupKey: `${grouping[level]}_${groupValue}`,
          groupColumn: grouping[level],
          groupValue: groupValue,
          groupPath: path,
          items: items as Group[] | DataRow[],
          isGroup: true,
          depth,
          totalItems,
        });
      }

      return groups;
    };

    return buildLevel(allRows, 0, '', 0) as Group[];
  };

  const nestedData =
    groupingCols.length > 0 ? buildGroupedData(rows, allColumns, groupingCols) : ([] as Group[]);

  const handleSort = (column: string) => {
    if (sortConfig.key === column)
      setSortConfig({ key: column, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    else setSortConfig({ key: column, direction: 'asc' });
  };

  const onExpandAllGroups = () => {
    const allIds = new Set<string>();
    const collect = (groups: Group[]) => {
      for (const g of groups) {
        allIds.add(g.groupPath);
        if (Array.isArray(g.items) && g.items.length > 0 && (g.items[0] as Group).isGroup)
          collect(g.items as Group[]);
      }
    };
    collect(nestedData);
    setExpandedGroups(allIds);
  };

  const onCollapseAllGroups = () => setExpandedGroups(new Set());

  const onToggleGroup = (groupId: string) =>
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });

  return (
    <>
      <ViewModeSelector
        type={viewMode}
        groupingColumns={tableConfig?.grouping || []}
        onTypeChange={(t) => setViewMode(t)}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(n) => setItemsPerPage(n)}
        onCurrentPageChange={(p) => setCurrentPage(p)}
        onExpandAllGroups={onExpandAllGroups}
        onCollapseAllGroups={onCollapseAllGroups}
      />

      <Spacing size={10} />

      {displayedColumns.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ flex: 1, overflow: 'auto' }}>
            {viewMode === 'table' ? (
              <DataTable
                selectedColumns={displayedColumns}
                paginatedData={paginatedData}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            ) : (
              <NestedTable
                data={nestedData}
                selectedColumns={displayedColumns}
                expandedGroups={expandedGroups}
                onToggleGroup={onToggleGroup}
              />
            )}
          </div>

          {viewMode === 'table' && totalPages > 1 && (
            <div style={{ marginTop: 12 }}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
