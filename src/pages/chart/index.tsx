import { Flex, Spacing } from '@basiln/utils';
import Separator from '@/components/chart/Separator';
import { useEffect, useMemo, useState } from 'react';
import ChartArea from '@/components/chart/ChartArea';
import type { ChartType } from './types';
import SideBar from '@/components/chart/SideBar';
import { chartPageCss } from './styles';
import { Link, useNavigate } from 'react-router';
import { Button, Text } from '@basiln/design-system';
import { ArrowLeftIcon, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const Chart = () => {
  const navigate = useNavigate();

  const [chartName, setChartName] = useState('새 차트');
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

  useEffect(() => {
    if (yAxisKeys.includes(xAxisKey)) {
      setYAxisKeys((prev) => prev.filter((key) => key !== xAxisKey));
    }
  }, [xAxisKey, yAxisKeys]);

  const addWidget = () => {
    console.log({
      name: chartName || '새 차트',
      type: chartType,
      processed_data: JSON.stringify(chartData),
      config: JSON.stringify({ xAxisKey, yAxisKeys }),
      position: {}, //
    });
    toast.success('위젯이 추가되었습니다.');
    navigate('/');
  };

  return (
    <div css={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 헤더 */}
      <Flex justify="start" css={chartPageCss.header}>
        <Link to=".." css={chartPageCss.backLinkButton}>
          <ArrowLeftIcon css={{ width: 14 }} />
          <Text>돌아가기</Text>
        </Link>

        <Spacing direction="horizontal" size={14} />

        <Text size="title-small">차트 만들기</Text>

        <Spacing direction="horizontal" size="auto" css={{ flex: 1 }} />

        <Button
          display="inline"
          gutter="20px"
          radius="small"
          css={{ height: 36 }}
          onClick={addWidget}
          disabled={!chartData || yAxisKeys.length === 0 || !xAxisKey}
        >
          <Text color="white">저장하기</Text>
        </Button>
      </Flex>

      <Flex css={{ width: '100%', flex: 1 }}>
        {/* 사이드 메뉴 */}
        <div css={{ width: 240, height: '100%', padding: '20px 16px' }}>
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

        <Separator css={{ height: '100%' }} color="gray_050" />

        {/* 차트 영역 */}
        {chartData ? (
          <Flex direction="column" css={chartPageCss.chartContainer}>
            <Text
              size="body-large"
              css={{ position: 'absolute', top: 20, left: 20 }}
            >
              미리보기
            </Text>
            <ChartArea
              chartData={chartData}
              chartType={chartType}
              xAxisKey={xAxisKey}
              yAxisKeys={yAxisKeys}
            />
          </Flex>
        ) : (
          <Flex direction="column" css={chartPageCss.placeholderContainer}>
            <Upload css={{ width: 36, height: 36, opacity: 0.5 }} />
            <Text size="body-medium" color="gray_080">
              차트 미리보기를 위해 <br /> CSV 파일을 업로드하세요
            </Text>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default Chart;
