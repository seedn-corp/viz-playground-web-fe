import type { ChartType } from '@/pages/chart/types';

export type ChartAreaProps = {
  chartData: Record<string, string>[];
  chartType: ChartType;
  xAxisKey: string;
  yAxisKeys: string[];
};

export type ChartProps = {
  chartData: Record<string, string>[];
  xAxisKey: string;
  yAxisKeys: string[];
};
