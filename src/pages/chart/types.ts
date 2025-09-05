export type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'composed';

export type ComposedChartConfig = {
  [key: string]: 'line' | 'bar' | 'area';
};
