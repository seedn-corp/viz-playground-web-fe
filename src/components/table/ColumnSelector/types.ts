export type ColumnSelectorProps = {
  headers: string[];
  selectedColumns: string[];
  onToggleColumn: (column: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
};
