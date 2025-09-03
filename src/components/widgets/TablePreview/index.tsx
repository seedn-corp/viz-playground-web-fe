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

  const columns = tableData && Array.isArray(tableData.columns) ? tableData.columns : [];
  const rows = tableData && Array.isArray(tableData.rows) ? tableData.rows : [];

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
    const idx = columns.indexOf(sortConfig.key);
    if (idx === -1) return rows;

    const copy = [...rows];
    copy.sort((a, b) => {
      const va = a?.[idx];
      const vb = b?.[idx];

      // handle null/undefined
      if (va == null && vb == null) return 0;
      if (va == null) return sortConfig.direction === 'asc' ? -1 : 1;
      if (vb == null) return sortConfig.direction === 'asc' ? 1 : -1;

      // numeric compare when possible
      const na = typeof va === 'number' ? va : Number(va);
      const nb = typeof vb === 'number' ? vb : Number(vb);
      const bothNumbers = !Number.isNaN(na) && !Number.isNaN(nb);
      if (bothNumbers) {
        return sortConfig.direction === 'asc' ? na - nb : nb - na;
      }

      // fallback to string compare
      const sa = String(va);
      const sb = String(vb);
      return sortConfig.direction === 'asc' ? sa.localeCompare(sb) : sb.localeCompare(sa);
    });

    return copy;
  }, [rows, sortConfig, columns]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / itemsPerPage));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedRows.slice(start, start + itemsPerPage) as DataRow[];
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
    groupingCols.length > 0 ? buildGroupedData(rows, columns, groupingCols) : ([] as Group[]);

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

      {columns.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ flex: 1, overflow: 'auto' }}>
            {viewMode === 'table' ? (
              <DataTable
                selectedColumns={columns}
                paginatedData={paginatedData}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            ) : (
              <NestedTable
                data={nestedData}
                selectedColumns={columns}
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
