import { Flex } from '@basiln/utils';
import Separator from '@/components/chart/Separator';
import { useEffect, useMemo, useState } from 'react';
import ChartArea from '@/components/chart/ChartArea';
import type { ChartType } from './types';
import SideBar from '@/components/chart/SideBar';

const Chart = () => {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [chartData, setChartData] = useState<Record<string, string>[]>();

  const [xAxisKey, setXAxisKey] = useState('');
  const [yAxisKeys, setYAxisKeys] = useState<string[]>([]);

  const chartDataKeys = useMemo(
    () => (chartData ? Object.keys(chartData?.[0]) : []),
    [chartData]
  );

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
      <Flex css={{ height: 60 }} />
      <Separator orientation="horizontal" css={{ height: '100%' }} />

      <Flex css={{ width: '100%', flex: 1 }}>
        <div css={{ width: 240, height: '100%' }}>
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
