import type { ChartType } from '@/pages/chart/types';

export type ChartAreaProps = {
  chartData: Record<string, string>[];
  chartType: ChartType;
  xAxisKey: string;
  yAxisKeys: string[];
};
