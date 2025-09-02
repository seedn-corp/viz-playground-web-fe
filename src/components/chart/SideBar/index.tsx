import type { ChartType } from '@/pages/chart/types';
import { Flex, Spacing, If } from '@basiln/utils';

import { Text } from '@basiln/design-system';
import { selectCss } from '../Select/styles';
import YAxisMultipleSelect from '../YAxisMultipleSelect';
import Select from '../Select';
import { parseCsvFileToJson } from '@/pages/chart/utils';
import type { SideBarProps } from './types';
import { sideBarCss } from './styles';

const SideBar = (props: SideBarProps) => {
  const {
    chartName,
    setChartName,
    chartData,
    setChartData,
    chartDataKeys,
    xAxisKey,
    setXAxisKey,
    yAxisKeys,
    setYAxisKeys,
    chartType,
    setChartType,
  } = props;

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = await parseCsvFileToJson(file);
      setChartData(data);
    }
  };

  return (
    <>
      <Flex align="start" direction="column">
        <Text>데이터 업로드</Text>
        <button css={{ position: 'relative' }}>
          <Text>CSV 업로드</Text>
          <input
            css={sideBarCss.fileInput}
            type="file"
            accept=".csv"
            onChange={uploadFile}
          />
        </button>
      </Flex>

      <Spacing size={20} />

      <If condition={!!chartData}>
        <Flex align="start" direction="column">
          <Text>차트 제목</Text>
          <input
            css={[selectCss.trigger, { width: '100%' }]}
            value={chartName}
            onChange={(e) => setChartName(e.target.value)}
          />
        </Flex>

        <Spacing size={20} />

        <Flex align="start" direction="column">
          <Text>차트 유형 선택</Text>
          <Select
            value={chartType}
            onValueChange={(value) => setChartType(value as ChartType)}
          >
            <Select.Trigger css={{ width: '100%' }}>{chartType}</Select.Trigger>
            <Select.Content>
              <Select.Item value="line">line</Select.Item>
              <Select.Item value="bar">bar</Select.Item>
              <Select.Item value="area">area</Select.Item>
              <Select.Item value="pie">pie</Select.Item>
            </Select.Content>
          </Select>
        </Flex>

        <Spacing size={20} />

        <Flex align="start" direction="column" css={{ width: '100%' }}>
          <Text>X축</Text>
          <Select
            value={xAxisKey}
            onValueChange={(value) => setXAxisKey(value)}
          >
            <Select.Trigger css={{ width: '100%' }}>{xAxisKey}</Select.Trigger>
            <Select.Content>
              {chartDataKeys.map((key) => (
                <Select.Item key={key} value={key}>
                  {key}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </Flex>

        <Spacing size={20} />

        {chartType === 'pie' ? (
          <Flex align="start" direction="column" css={{ width: '100%' }}>
            <Text>Y축</Text>
            <Select
              value={yAxisKeys[0]}
              onValueChange={(value) => setYAxisKeys([value])}
            >
              <Select.Trigger css={{ width: '100%' }}>
                {yAxisKeys[0]}
              </Select.Trigger>
              <Select.Content>
                {chartDataKeys.map((key) => (
                  <Select.Item key={key} value={key}>
                    {key}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </Flex>
        ) : (
          <Flex align="start" direction="column">
            <Text>Y축</Text>
            <YAxisMultipleSelect
              name={yAxisKeys}
              onChange={setYAxisKeys}
              items={chartDataKeys}
            />
          </Flex>
        )}
      </If>
    </>
  );
};

export default SideBar;
