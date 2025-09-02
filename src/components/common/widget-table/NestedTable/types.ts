import type { Group } from '@/pages/widget-table/types';

export type NestedTableProps = {
  sortedData: Group[];
  selectedColumns: string[];
  expandedGroups: Set<string>;
  onToggleGroup: (groupKey: string) => void;
};
