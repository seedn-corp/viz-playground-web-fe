import type { ComposedChartConfig } from '@/pages/chart/types';

export type ChartProps = {
  // processed_data
  chartData: Record<string, string>[];
  // config
  xAxisKey: string;
  yAxisKeys: string[];
  filters: Record<string, string[]>;
  composedConfig?: ComposedChartConfig;
};
