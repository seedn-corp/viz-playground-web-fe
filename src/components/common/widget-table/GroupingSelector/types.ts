export type GroupingSelectorProps = {
  selectedColumns: string[];
  groupingColumns: string[];
  onUpdateGrouping: (level: number, column: string) => void;
  onClearGrouping: () => void;
};
