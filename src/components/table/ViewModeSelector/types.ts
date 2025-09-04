import type { HTMLAttributes } from 'react';

export type ViewModeSelectorProps = HTMLAttributes<HTMLDivElement> & {
  type: 'group' | 'table';
  onTypeChange: (type: 'group' | 'table') => void;
  itemsPerPage: number;
  onItemsPerPageChange: (count: number) => void;
  groupingColumns: string[];
  onCurrentPageChange: (page: number) => void;
  onExpandAllGroups: () => void;
  onCollapseAllGroups: () => void;
};
