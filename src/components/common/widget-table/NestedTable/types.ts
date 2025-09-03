import type { Group } from '@/pages/widget-table/types';

export type NestedTableProps = {
  data: Group[];
  selectedColumns: string[];
  expandedGroups: Set<string>;
  onToggleGroup: (groupKey: string) => void;
};
