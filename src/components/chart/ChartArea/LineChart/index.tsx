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

const LineChart = ({ chartData }: { chartData: Record<string, string>[] }) => {
  // x축 선택
  // y축 선택 (여러개)
  console.log(
    JSON.stringify(
      chartData.map((item) => ({
        ...item,
        timestamp: item.timestamp.slice(11),
      }))
    )
  );
  return (
    <div>
      <ResponsiveContainer width="100%" height={150}>
        <RechartsLineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
