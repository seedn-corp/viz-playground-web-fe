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

const AreaChart = ({ chartData, xAxisKey, yAxisKeys }: ChartProps) => {
  // x축 선택
  // y축 선택 (여러개)
  return (
    <div>
      <ResponsiveContainer width="100%" height={150}>
        <RechartsAreaChart data={chartData}>
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
