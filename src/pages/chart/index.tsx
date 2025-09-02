import { Flex, If, Spacing } from '@basiln/utils';
import Separator from '@/components/chart/Separator';
import { chartPageCss } from './styles';
import { useRef, useState } from 'react';

import { parseCsvFileToJson } from './utils';
import ChartArea from '@/components/chart/ChartArea';
import { Select } from '@/components/chart/Select';
import { Text } from '@basiln/design-system';
import type { ChartType } from './types';

const Chart = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [chartType, setChartType] = useState<ChartType>('line');
  const [chartData, setChartData] = useState<Record<string, string>[]>();

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = await parseCsvFileToJson(file);
      setChartData(data);
    }
  };

  return (
    <div css={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Flex css={{ height: 60 }}></Flex>
      <Separator orientation="horizontal" css={{ height: '100%' }} />

      <Flex css={{ width: '100%', flex: 1 }}>
        <div css={{ width: 240, height: '100%' }}>
          <Flex align="start" direction="column">
            <Text>데이터 업로드</Text>
            <button css={{ position: 'relative' }}>
              <Text>CSV 업로드</Text>
              <input
                css={chartPageCss.fileInput}
                type="file"
                accept=".csv"
                onChange={uploadFile}
                ref={fileInputRef}
              />
            </button>
          </Flex>

          <Spacing size={20} />

          <If condition={!!chartData}>
            <Flex align="start" direction="column">
              <Text>차트 제목</Text>
              <input />
            </Flex>

            <Spacing size={20} />

            <Flex align="start" direction="column">
              <Text>차트 유형 선택</Text>
              <Select
                value={chartType}
                onValueChange={(value) => setChartType(value as ChartType)}
              >
                <Select.Trigger>{chartType}</Select.Trigger>
                <Select.Content>
                  <Select.Item value="line">line</Select.Item>
                  <Select.Item value="bar">bar</Select.Item>
                  <Select.Item value="area">area</Select.Item>
                  <Select.Item value="pie">pie</Select.Item>
                </Select.Content>
              </Select>
            </Flex>

            <Spacing size={20} />

            <Flex align="start" direction="column">
              <Text>차트 유형 선택</Text>
            </Flex>
          </If>
        </div>

        <Separator css={{ height: '100%' }} />

        <div css={{ flex: 1 }}>
          {chartData && (
            <ChartArea chartData={chartData} chartType={chartType} />
          )}
        </div>
      </Flex>
    </div>
  );
};

export default Chart;
