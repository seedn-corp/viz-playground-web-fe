import type { DataRow } from '@/pages/table/types';

export type DataTableProps = {
  selectedColumns: string[];
  paginatedData: DataRow[];
  sortConfig: { key: string | null; direction: 'asc' | 'desc' };
  onSort: (column: string) => void;
};
