import {
  ResponsiveContainer,
  Pie,
  Cell,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
} from 'recharts';

import { CustomTooltip } from '../CustomTooltip';
import type { ChartProps } from '../types';
import { LEGEND_STYLE } from '../utils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChart = ({ chartData, xAxisKey, yAxisKeys }: ChartProps) => {
  const pieChartData: { name: string; value: number }[] = Object.values(
    chartData.reduce((acc, cur) => {
      const name = cur[xAxisKey];
      const value = Number(cur[yAxisKeys[0]]);
      // 같은 name을 가진 항목이 여러 개일 경우 value를 합산
      if (!acc[name]) {
        acc[name] = { name, value: 0 };
      }
      acc[name].value += value;
      return acc;
    }, {} as Record<string, { name: string; value: number }>),
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={pieChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend {...LEGEND_STYLE} />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
