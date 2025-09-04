import type { ChartType } from '@/pages/chart/types';

export type WidgetChartProps = {
  chartData: Record<string, string>[];
  chartType: ChartType;
  xAxisKey: string;
  yAxisKeys: string[];
};
