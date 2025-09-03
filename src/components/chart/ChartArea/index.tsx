import { Choose } from '@basiln/utils';

import AreaChart from '@/components/common/charts/AreaChart';
import BarChart from '@/components/common/charts/BarChart';
import LineChart from '@/components/common/charts/LineChart';
import PieChart from '@/components/common/charts/PieChart';
import type { ChartProps } from '@/components/common/charts/types';

import type { ChartAreaProps } from './types';

const ChartArea = ({
  chartData,
  chartType,
  xAxisKey,
  yAxisKeys,
}: ChartAreaProps) => {
  const chartProps: ChartProps = { chartData, xAxisKey, yAxisKeys };
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
    </Choose>
  );
};

export default ChartArea;
