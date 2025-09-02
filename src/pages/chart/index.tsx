import { Flex, Spacing } from '@basiln/utils';
import Separator from '@/components/chart/Separator';
import { useEffect, useMemo, useState } from 'react';
import ChartArea from '@/components/chart/ChartArea';
import type { ChartType } from './types';
import SideBar from '@/components/chart/SideBar';
import { chartPageCss } from './styles';
import { Link } from 'react-router';
import { Text } from '@basiln/design-system';
import { ArrowLeftIcon } from 'lucide-react';

const Chart = () => {
  const [chartName, setChartName] = useState('새 차트');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [chartData, setChartData] = useState<Record<string, string>[]>();

  const [xAxisKey, setXAxisKey] = useState('');
  const [yAxisKeys, setYAxisKeys] = useState<string[]>([]);

  const chartDataKeys = useMemo(
    () => (chartData ? Object.keys(chartData?.[0]) : []),
    [chartData]
  );
  console.log(JSON.stringify(chartData));

  useEffect(() => {
    if (chartDataKeys.length > 0) {
      setXAxisKey(chartDataKeys[0]);
      setYAxisKeys(chartDataKeys.slice(1, 3));
    }
  }, [chartDataKeys]);

  useEffect(() => {
    if (chartType === 'pie') {
      setYAxisKeys((prev) => [prev[0]]);
    }
  }, [chartType]);

  return (
    <div css={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Flex justify="start" css={chartPageCss.header}>
        <Link
          to=".."
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '4px 8px',
            borderRadius: 4,
            ':hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <ArrowLeftIcon css={{ width: 14 }} />
          <Text>돌아가기</Text>
        </Link>

        <Spacing direction="horizontal" size={24} />

        <Text size="title-medium">차트 만들기</Text>
      </Flex>

      <Flex css={{ width: '100%', flex: 1 }}>
        <div css={{ width: 220, height: '100%', padding: '20px 16px' }}>
          <SideBar
            {...{
              chartData,
              setChartData,
              chartDataKeys,
              xAxisKey,
              setXAxisKey,
              yAxisKeys,
              setYAxisKeys,
              chartType,
              setChartType,
              chartName,
              setChartName,
            }}
          />
        </div>

        <Separator css={{ height: '100%' }} />

        <div css={{ flex: 1 }}>
          {chartData && (
            <ChartArea
              chartData={chartData}
              chartType={chartType}
              xAxisKey={xAxisKey}
              yAxisKeys={yAxisKeys}
            />
          )}
        </div>
      </Flex>
    </div>
  );
};

export default Chart;
