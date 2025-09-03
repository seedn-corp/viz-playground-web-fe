export type DataRow = (string | number | null | undefined)[];

export type Group = {
  groupKey: string;
  groupColumn: string;
  groupValue: string;
  groupPath: string;
  items: Group[] | DataRow[];
  isGroup: true;
  depth: number;
  totalItems: number;
};
