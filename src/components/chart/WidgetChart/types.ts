import type { ChartProps } from '@/components/common/charts/types';
import type { ChartType } from '@/pages/chart/types';

export type WidgetChartProps = {
  chartType: ChartType;
} & ChartProps;
