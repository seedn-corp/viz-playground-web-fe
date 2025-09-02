import type { DataRow } from '@/pages/widget-table/types';

export type DataTableProps = {
  selectedColumns: string[];
  paginatedData: DataRow[];
  sortConfig: { key: string | null; direction: 'asc' | 'desc' };
  onSort: (column: string) => void;
};
