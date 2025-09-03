import type { LegendProps } from 'recharts';

// charts/styles.ts
export const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#AA00FF',
  '#FF4081',
];

export const LEGEND_STYLE = {
  verticalAlign: 'top',
  align: 'right',
  wrapperStyle: { fontSize: 12, fontWeight: 500 },
} as LegendProps;
