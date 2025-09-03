import { Button, Text } from '@basiln/design-system';
import { Flex, Spacing } from '@basiln/utils';
import { ArrowLeftIcon, Upload } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

import ChartArea from '@/components/chart/ChartArea';
import Separator from '@/components/chart/Separator';
import SideBar from '@/components/chart/SideBar';

import { chartPageCss } from './styles';
import type { ChartType } from './types';

import { useCreateWidget } from '@/hooks/mutation/widgets/useCreateWidget';
import type { WidgetType } from '@/types/widgets';
import { useQuery } from '@tanstack/react-query';
import { widgetsQueries } from '@/queries/widgets';
import { computeNextPosition } from '@/utils/computeNextPosition';

const Chart = () => {
  const navigate = useNavigate();

  const [chartName, setChartName] = useState('새 차트');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [chartData, setChartData] = useState<Record<string, string>[]>();
  const [filteredData, setFilteredData] = useState<Record<string, string>[]>();
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const [xAxisKey, setXAxisKey] = useState('');
  const [yAxisKeys, setYAxisKeys] = useState<string[]>([]);

  const chartDataKeys = useMemo(() => (chartData ? Object.keys(chartData?.[0]) : []), [chartData]);
  const numberValueKeys = chartDataKeys.filter((key) => !isNaN(Number(chartData?.[0][key])));

  const { data } = useQuery(widgetsQueries.all('d3985fd6-327b-4ab6-8720-0fa6e63b916b'));

  const { mutate, isPending } = useCreateWidget();

  useEffect(() => {
    if (chartDataKeys.length > 0) {
      setXAxisKey(chartDataKeys[0]);
      setYAxisKeys(numberValueKeys.slice(1, 3));
    }
  }, [chartDataKeys]);

  useEffect(() => {
    setFilteredData(chartData);
  }, [chartData]);

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
    mutate(
      {
        dashboardId: 'd3985fd6-327b-4ab6-8720-0fa6e63b916b',
        name: chartName || '새 차트',
        type: (chartType + '_chart') as WidgetType,
        processed_data: JSON.stringify(chartData),
        config: JSON.stringify({ xAxisKey, yAxisKeys, filters }),
        position: computeNextPosition(data),
      },
      {
        onSuccess: () => {
          toast.success('위젯이 추가되었습니다.');
          navigate('/');
        },
        onError: (error) => {
          toast.error(`위젯 추가에 실패했습니다: ${error.message}`);
        },
      },
    );
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
          disabled={!chartData || yAxisKeys.length === 0 || !xAxisKey || isPending}
          isLoading={isPending}
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
              onFilterChange: setFilteredData,
              filters,
              setFilters,
            }}
          />
        </div>

        <Separator css={{ height: '100%' }} color="gray_050" />

        {/* 차트 영역 */}
        {chartData ? (
          <Flex direction="column" css={chartPageCss.chartContainer}>
            <Text size="body-large" css={{ position: 'absolute', top: 20, left: 20 }}>
              미리보기
            </Text>
            <ChartArea
              chartData={filteredData || chartData}
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
