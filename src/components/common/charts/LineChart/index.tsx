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

import { aggregateChartData } from '../../../chart/WidgetChart/utils';
import { CustomTooltip } from '../CustomTooltip';
import type { ChartProps } from '../types';
import { COLORS, LEGEND_STYLE } from '../utils';

const LineChart = ({ chartData, xAxisKey, yAxisKeys }: ChartProps) => {
  const aggregatedData = aggregateChartData(chartData, xAxisKey, yAxisKeys);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={aggregatedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} tick={{ fill: '#666', fontSize: 12 }} />
        <YAxis tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} width={30} />
        <Tooltip content={<CustomTooltip />} />
        <Legend {...LEGEND_STYLE} />
        {yAxisKeys.map((item, index) => (
          <Line key={item} type="monotone" dataKey={item} stroke={COLORS[index % COLORS.length]} />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
