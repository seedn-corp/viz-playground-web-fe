import {
  Area,
  Bar,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart as RechartsComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useChartColors } from '@/hooks/useChartColors';
import type { ComposedChartConfig } from '@/pages/chart/types';

import { aggregateChartData } from '../../../chart/WidgetChart/utils';
import { CustomTooltip } from '../CustomTooltip';
import type { ChartProps } from '../types';
import { LEGEND_STYLE } from '../utils';

type ComposedChartProps = ChartProps & {
  composedConfig: ComposedChartConfig;
};

const ComposedChart = ({ chartData, xAxisKey, yAxisKeys, composedConfig }: ComposedChartProps) => {
  const colors = useChartColors();
  const aggregatedData = aggregateChartData(chartData, xAxisKey, yAxisKeys);

  const renderChartElement = (yAxisKey: string, index: number) => {
    const chartType = composedConfig[yAxisKey] || 'line';
    const color = colors[index % colors.length];

    switch (chartType) {
      case 'line':
        return (
          <Line 
            key={yAxisKey}
            type="monotone" 
            dataKey={yAxisKey} 
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        );
      case 'bar':
        return (
          <Bar 
            key={yAxisKey}
            dataKey={yAxisKey} 
            fill={color}
            barSize={50}
            opacity={0.8}
          />
        );
      case 'area':
        return (
          <Area 
            key={yAxisKey}
            type="monotone" 
            dataKey={yAxisKey} 
            stroke={color}
            fill={color}
            fillOpacity={0.3}
            strokeWidth={2}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsComposedChart data={aggregatedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} tick={{ fill: '#666', fontSize: 12 }} />
        <YAxis tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} width={30} />
        <Tooltip content={<CustomTooltip />} />
        <Legend {...LEGEND_STYLE} />
        {yAxisKeys.map((yAxisKey, index) => renderChartElement(yAxisKey, index))}
      </RechartsComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedChart;