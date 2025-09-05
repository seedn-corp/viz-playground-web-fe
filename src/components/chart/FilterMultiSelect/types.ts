export type FilterMultiSelectProps = {
  name: string[];
  onChange: (name: string[]) => void;
  items: string[];
  placeholder?: string;
};