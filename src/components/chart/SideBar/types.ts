import type { ChartType } from '@/pages/chart/types';

export type SideBarProps = {
  chartData: Record<string, string>[] | undefined;
  setChartData: React.Dispatch<
    React.SetStateAction<Record<string, string>[] | undefined>
  >;
  chartDataKeys: string[];
  xAxisKey: string;
  setXAxisKey: React.Dispatch<React.SetStateAction<string>>;
  yAxisKeys: string[];
  setYAxisKeys: React.Dispatch<React.SetStateAction<string[]>>;
  chartType: ChartType;
  setChartType: React.Dispatch<React.SetStateAction<ChartType>>;
  chartName: string;
  setChartName: React.Dispatch<React.SetStateAction<string>>;
};
