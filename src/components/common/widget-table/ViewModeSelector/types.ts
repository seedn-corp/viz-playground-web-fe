export type ViewModeSelectorProps = {
  type: 'group' | 'table';
  onTypeChange: (type: 'group' | 'table') => void;
  itemsPerPage: number;
  onItemsPerPageChange: (count: number) => void;
  onCurrentPageChange: (page: number) => void;
  onExpandAllGroups: () => void;
  onCollapseAllGroups: () => void;
};
