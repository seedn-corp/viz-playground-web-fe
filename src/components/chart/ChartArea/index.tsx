import { Choose } from '@basiln/utils';
import LineChart from './LineChart';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import PieChart from './PieChart';

import type { ChartAreaProps, ChartProps } from './types';

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
