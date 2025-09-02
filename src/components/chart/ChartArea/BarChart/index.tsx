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

const BarChart = ({ chartData }: { chartData: Record<string, string>[] }) => {
  // x축 선택
  // y축 선택 (여러개)
  return (
    <div>
      <ResponsiveContainer width="100%" height={150}>
        <RechartsBarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar type="monotone" dataKey="temperature" stroke="#8884d8" />
          <Bar type="monotone" dataKey="humidity" stroke="#82ca9d" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
