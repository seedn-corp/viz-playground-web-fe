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

import { aggregateChartData } from '../../../chart/WidgetChart/utils';
import { CustomTooltip } from '../CustomTooltip';
import type { ChartProps } from '../types';
import { LEGEND_STYLE, COLORS } from '../utils';

const BarChart = ({ chartData, xAxisKey, yAxisKeys }: ChartProps) => {
  const aggregatedData = aggregateChartData(chartData, xAxisKey, yAxisKeys);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={aggregatedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} tick={{ fill: '#666', fontSize: 12 }} />
        <YAxis tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} width={30} />
        <Tooltip content={<CustomTooltip />} />
        <Legend {...LEGEND_STYLE} />
        {yAxisKeys.map((item, index) => (
          <Bar
            key={item}
            type="monotone"
            dataKey={item}
            fill={COLORS[index % COLORS.length]}
            barSize={50}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
