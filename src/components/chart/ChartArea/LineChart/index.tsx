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

const LineChart = ({ chartData, xAxisKey, yAxisKeys }: ChartProps) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={150}>
        <RechartsLineChart data={chartData}>
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
