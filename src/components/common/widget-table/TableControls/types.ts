export type TableControlsProps = {
  fileName: string;
  rowCount: number;
  colCount: number;
  searchTerm: string;
  onSearch: (term: string) => void;
  onReset: () => void;
  groupingColumns: string[];
};
