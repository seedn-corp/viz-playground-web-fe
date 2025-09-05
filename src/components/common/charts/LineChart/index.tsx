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

import { useChartColors } from '@/hooks/useChartColors';

import { aggregateChartData } from '../../../chart/WidgetChart/utils';
import { CustomTooltip } from '../CustomTooltip';
import type { ChartProps } from '../types';
import { LEGEND_STYLE } from '../utils';

const LineChart = ({ chartData, xAxisKey, yAxisKeys }: ChartProps) => {
  const colors = useChartColors();
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
          <Line key={item} type="monotone" dataKey={item} stroke={colors[index % colors.length]} />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
