import { Choose } from '@basiln/utils';
import { useMemo } from 'react';

import AreaChart from '@/components/common/charts/AreaChart';
import BarChart from '@/components/common/charts/BarChart';
import ComposedChart from '@/components/common/charts/ComposedChart';
import LineChart from '@/components/common/charts/LineChart';
import PieChart from '@/components/common/charts/PieChart';
import type { ChartProps } from '@/components/common/charts/types';

import type { WidgetChartProps } from './types';

const WidgetChart = ({
  chartData,
  chartType,
  xAxisKey,
  yAxisKeys,
  filters,
  composedConfig,
}: WidgetChartProps) => {
  const filteredData = useMemo(
    () =>
      chartData?.filter((item) => {
        return Object.entries(filters || {}).every(([filterColumn, filterValues]) => {
          return filterValues.length === 0 || filterValues.includes(item[filterColumn]);
        });
      }),
    [chartData, filters],
  );

  const chartProps: ChartProps = {
    chartData: filteredData,
    xAxisKey,
    yAxisKeys,
    filters,
    composedConfig,
  };

  return (
    <Choose>
      <Choose.When condition={chartType === 'line'}>
        <LineChart {...chartProps} />
      </Choose.When>
      <Choose.When condition={chartType === 'bar'}>
        <BarChart {...chartProps} />
      </Choose.When>
      <Choose.When condition={chartType === 'area'}>
        <AreaChart {...chartProps} />
      </Choose.When>
      <Choose.When condition={chartType === 'pie'}>
        <PieChart {...chartProps} />
      </Choose.When>
      <Choose.When condition={chartType === 'composed'}>
        <ComposedChart {...chartProps} composedConfig={composedConfig || {}} />
      </Choose.When>
    </Choose>
  );
};

export default WidgetChart;
