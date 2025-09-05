import { Text } from '@basiln/design-system';
import { Flex, Spacing } from '@basiln/utils';
import Select from '../Select';
import type { ComposedChartConfig } from '@/pages/chart/types';

type ComposedYAxisSelectProps = {
  yAxisKeys: string[];
  composedConfig: ComposedChartConfig;
  onComposedConfigChange: (config: ComposedChartConfig) => void;
  disabledItem?: string;
};

const ComposedYAxisSelect = ({
  yAxisKeys,
  composedConfig,
  onComposedConfigChange,
}: ComposedYAxisSelectProps) => {
  const handleChartTypeChange = (yAxisKey: string, chartType: 'line' | 'bar' | 'area') => {
    const newConfig = {
      ...composedConfig,
      [yAxisKey]: chartType,
    };
    onComposedConfigChange(newConfig);
  };

  return (
    <Flex align="start" direction="column" css={{ width: '100%' }}>
      <Text>Y축 및 차트 타입</Text>
      <Spacing size={8} />

      {yAxisKeys.map((yAxisKey) => (
        <div key={yAxisKey} css={{ width: '100%', marginBottom: 12 }}>
          <Flex align="center" gap={8} css={{ width: '100%' }}>
            <Text
              size="body-small"
              css={{ minWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {yAxisKey}
            </Text>
            <Select
              value={composedConfig[yAxisKey] || 'line'}
              onValueChange={(value) =>
                handleChartTypeChange(yAxisKey, value as 'line' | 'bar' | 'area')
              }
            >
              <Select.Trigger css={{ width: 120 }}>
                {composedConfig[yAxisKey] || 'line'}
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="line">line</Select.Item>
                <Select.Item value="bar">bar</Select.Item>
                <Select.Item value="area">area</Select.Item>
              </Select.Content>
            </Select>
          </Flex>
        </div>
      ))}
    </Flex>
  );
};

export default ComposedYAxisSelect;
