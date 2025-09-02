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

const AreaChart = ({ chartData }: { chartData: Record<string, string>[] }) => {
  // x축 선택
  // y축 선택 (여러개)
  return (
    <div>
      <ResponsiveContainer width="100%" height={150}>
        <RechartsAreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="temperature" stroke="#8884d8" />
          <Area type="monotone" dataKey="humidity" stroke="#82ca9d" />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;
