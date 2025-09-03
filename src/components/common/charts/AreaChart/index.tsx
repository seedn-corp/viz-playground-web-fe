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

import { aggregateChartData } from '../../../chart/ChartArea/utils';
import { CustomTooltip } from '../CustomTooltip';
import type { ChartProps } from '../types';
import { COLORS, LEGEND_STYLE } from '../utils';

const AreaChart = ({ chartData, xAxisKey, yAxisKeys }: ChartProps) => {
  const aggregatedData = aggregateChartData(chartData, xAxisKey, yAxisKeys);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart data={aggregatedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} tick={{ fill: '#666', fontSize: 12 }} />
        <YAxis tick={{ fill: '#666', fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend {...LEGEND_STYLE} />
        {yAxisKeys.map((item, index) => (
          <Area
            key={item}
            type="monotone"
            dataKey={item}
            stroke={COLORS[index % COLORS.length]}
            fill={COLORS[index % COLORS.length]}
            fillOpacity={0.3}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChart;
