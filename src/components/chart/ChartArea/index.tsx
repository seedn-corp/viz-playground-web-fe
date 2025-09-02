import { Choose } from '@basiln/utils';
import LineChart from './LineChart';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import PieChart from './PieChart';
import type { ChartType } from '@/pages/chart/types';

const ChartArea = ({
  chartData,
  chartType,
}: {
  chartData: Record<string, string>[];
  chartType: ChartType;
}) => {
  return (
    <div>
      <Choose>
        <Choose.When condition={chartType === 'line'}>
          <LineChart chartData={chartData} />
        </Choose.When>
        <Choose.When condition={chartType === 'bar'}>
          <BarChart chartData={chartData} />
        </Choose.When>
        <Choose.When condition={chartType === 'area'}>
          <AreaChart chartData={chartData} />
        </Choose.When>
        <Choose.When condition={chartType === 'pie'}>
          <PieChart chartData={chartData} valueKey="temperature" />
        </Choose.When>
      </Choose>
    </div>
  );
};

export default ChartArea;
