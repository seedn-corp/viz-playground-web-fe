import {
  Bar,
  CartesianGrid,
  Legend,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ChartProps } from '../types';
import { aggregateChartData } from '../utils';

const BarChart = ({ chartData, xAxisKey, yAxisKeys }: ChartProps) => {
  const aggregatedData = aggregateChartData(chartData, xAxisKey, yAxisKeys);
  return (
    <div>
      <ResponsiveContainer width="100%" height={150}>
        <RechartsBarChart data={aggregatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {yAxisKeys.map((item) => (
            <Bar key={item} type="monotone" dataKey={item} stroke="#8884d8" />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
