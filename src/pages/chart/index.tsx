import { Button, Spinner, Text } from '@basiln/design-system';
import { Flex, Spacing } from '@basiln/utils';
import { ArrowLeftIcon, Upload } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';

import WidgetChart from '@/components/chart/WidgetChart';
import Separator from '@/components/chart/Separator';
import SideBar from '@/components/chart/SideBar';

import { chartPageCss } from './styles';
import type { ChartType, ComposedChartConfig } from './types';

import { useCreateWidget } from '@/hooks/mutation/widgets/useCreateWidget';
import type { WidgetType } from '@/types/widgets';
import { useQuery } from '@tanstack/react-query';
import { widgetsQueries } from '@/queries/widgets';
import { computeNextPosition } from '@/utils/computeNextPosition';
import type { RouteIds } from '../table/types';
import { LocalStorage } from '@/utils/LocalStorage';
import { useUpdateWidget } from '@/hooks/mutation/widgets';
import { getDifferentKeys } from './utils';
import { LoadingOverlay } from '@/components/common/LoadingOverlay';
import { dashboardQueries } from '@/queries/dashboard';
import { Breadcrumb } from '@/components/common/Breadcrumb/Breadcrumb';

const Chart = () => {
  const navigate = useNavigate();

  const [chartName, setChartName] = useState('새 차트');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [chartData, setChartData] = useState<Record<string, string>[]>();
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [composedConfig, setComposedConfig] = useState<ComposedChartConfig>({});

  const [xAxisKey, setXAxisKey] = useState('');
  const [yAxisKeys, setYAxisKeys] = useState<string[]>([]);

  const chartDataKeys = useMemo(() => (chartData ? Object.keys(chartData?.[0]) : []), [chartData]);
  const numberValueKeys = chartDataKeys.filter((key) => !isNaN(Number(chartData?.[0][key])));

  const createMutation = useCreateWidget();
  const updateMutation = useUpdateWidget();

  const { id: dashboardId } = useParams();

  const [routeIds, setRouteIds] = useState<RouteIds>();

  useEffect(() => {
    if (dashboardId?.length === 17) {
      const id = LocalStorage.getItem(`${dashboardId}`);
      const { dashboardId: _dashboardId, widgetId } = JSON.parse(id || '{}');
      setRouteIds({ dashboardId: _dashboardId, widgetId });
    } else {
      setRouteIds({ dashboardId: dashboardId ?? '', widgetId: undefined });
    }
  }, [dashboardId]);

  // 위젯 전체 정보 받아오기 (position 계산용)
  const { data: widgets, error: widgetsError } = useQuery({
    ...widgetsQueries.all(routeIds?.dashboardId ?? ''),
    enabled: !!routeIds?.dashboardId && !routeIds?.widgetId,
  });

  // 위젯 상세 정보 받아오기 (수정 모드일 때)
  const { data: widgetDetail, isPending: isLoadingWidgetDetail } = useQuery(
    widgetsQueries.detail(routeIds?.widgetId ?? ''),
  );

  useEffect(() => {
    if (widgetDetail) {
      const { processed_data, config, type, name } = widgetDetail;
      const { xAxisKey, yAxisKeys, filters, composedConfig } = JSON.parse(config);
      setChartName(name);
      setChartType(type.replace('_chart', '') as ChartType);
      setChartData(JSON.parse(processed_data));
      setXAxisKey(xAxisKey);
      setYAxisKeys(yAxisKeys);
      setFilters(filters || {});
      setComposedConfig(composedConfig || {});
    }
  }, [widgetDetail]);

  useEffect(() => {
    if (widgetDetail?.processed_data === JSON.stringify(chartData)) {
      return;
    }
    if (chartDataKeys.length > 0) {
      setXAxisKey(chartDataKeys[0]);
      setYAxisKeys(numberValueKeys.slice(0, 2));
    }
  }, [chartData, widgetDetail]);

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
    if (widgetsError || !widgets) {
      return;
    }
    const apiChartType = chartType === 'composed' ? 'composed_chart' : chartType + '_chart';
    createMutation.mutate(
      {
        dashboardId: routeIds?.dashboardId || '',
        name: chartName || '새 차트',
        type: apiChartType as WidgetType,
        processed_data: JSON.stringify(chartData),
        config: JSON.stringify({ xAxisKey, yAxisKeys, filters, composedConfig }),
        position: computeNextPosition(widgets),
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

  const updateWidget = () => {
    const apiChartType = chartType === 'composed' ? 'composed_chart' : chartType + '_chart';
    const mutationData = getDifferentKeys(
      {
        name: widgetDetail?.name,
        type: widgetDetail?.type,
        processed_data: widgetDetail?.processed_data,
        config: widgetDetail?.config,
      },
      {
        name: chartName || '새 차트',
        type: apiChartType as WidgetType,
        processed_data: JSON.stringify(chartData),
        config: JSON.stringify({ xAxisKey, yAxisKeys, filters, composedConfig }),
      },
    );
    updateMutation.mutate(
      {
        id: routeIds?.widgetId || '',
        ...mutationData,
      },
      {
        onSuccess: () => {
          toast.success('위젯이 수정되었습니다.');
          navigate('/');
        },
        onError: (error) => {
          toast.error(`위젯 수정에 실패했습니다: ${error.message}`);
        },
      },
    );
  };

  // 대시보드 이름 표시용 상세 조회
  const { data: dashboardDetail, isPending: isLoadingDashboardDetail } = useQuery(
    dashboardQueries.detail(routeIds?.dashboardId ?? ''),
  );

  const breadcrumbItems = [
    { label: '대시보드' },
    { label: dashboardDetail?.name ?? routeIds?.dashboardId ?? '대시보드' },
  ];

  const isLoading = (!!routeIds?.widgetId && isLoadingWidgetDetail) || isLoadingDashboardDetail;

  return (
    <div css={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LoadingOverlay visible={isLoading} />

      {/* 헤더 */}
      <Flex justify="start" css={chartPageCss.header}>
        <Link to=".." css={chartPageCss.backLinkButton}>
          <ArrowLeftIcon css={{ width: 14 }} />
          <Text>돌아가기</Text>
        </Link>

        <Spacing direction="horizontal" size={14} />

        <Breadcrumb
          items={breadcrumbItems}
          pageTitle={!routeIds?.widgetId ? '차트 만들기' : '차트 편집'}
        />

        <Spacing direction="horizontal" size="auto" css={{ flex: 1 }} />

        <Button
          display="inline"
          gutter="20px"
          radius="small"
          css={{ height: 36 }}
          onClick={routeIds?.widgetId ? updateWidget : addWidget}
          disabled={
            !chartData ||
            yAxisKeys.length === 0 ||
            !xAxisKey ||
            createMutation.isPending ||
            updateMutation.isPending ||
            isLoading
          }
          isLoading={createMutation.isPending || updateMutation.isPending}
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
              filters,
              setFilters,
              composedConfig,
              setComposedConfig,
            }}
          />
        </div>

        <Separator css={{ height: '100%' }} color="gray_050" />

        {/* 차트 영역 */}
        {isLoading ? (
          <Flex css={{ flex: 1 }}>
            <Spinner color="seedn_key" />
          </Flex>
        ) : chartData ? (
          <Flex direction="column" css={chartPageCss.chartContainer}>
            <Text size="body-large" css={{ position: 'absolute', top: 20, left: 20 }}>
              미리보기
            </Text>
            <div css={{ width: '100%', height: 300 }}>
              <WidgetChart
                chartData={chartData}
                chartType={chartType}
                xAxisKey={xAxisKey}
                yAxisKeys={yAxisKeys}
                filters={filters}
                composedConfig={composedConfig}
              />
            </div>
          </Flex>
        ) : (
          <Flex direction="column" css={chartPageCss.placeholderContainer}>
            <Upload css={{ width: 36, height: 36, opacity: 0.5 }} />
            <Text size="body-medium" color="gray_080">
              차트 미리보기를 위해 <br />
              파일을 업로드하세요
            </Text>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default Chart;
