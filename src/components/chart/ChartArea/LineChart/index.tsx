import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ChartProps } from '../types';
import { aggregateChartData } from '../utils';

const LineChart = ({ chartData, xAxisKey, yAxisKeys }: ChartProps) => {
  const aggregatedData = aggregateChartData(chartData, xAxisKey, yAxisKeys);
  return (
    <div>
      <ResponsiveContainer width="100%" height={150}>
        <RechartsLineChart data={aggregatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {yAxisKeys.map((item) => (
            <Line key={item} type="monotone" dataKey={item} stroke="#8884d8" />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
