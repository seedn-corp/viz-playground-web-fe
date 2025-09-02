import {
  Area,
  CartesianGrid,
  Legend,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ChartProps } from '../types';
import { aggregateChartData } from '../utils';

const AreaChart = ({ chartData, xAxisKey, yAxisKeys }: ChartProps) => {
  const aggregatedData = aggregateChartData(chartData, xAxisKey, yAxisKeys);
  return (
    <div>
      <ResponsiveContainer width="100%" height={150}>
        <RechartsAreaChart data={aggregatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {yAxisKeys.map((item) => (
            <Area key={item} type="monotone" dataKey={item} stroke="#8884d8" />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;
