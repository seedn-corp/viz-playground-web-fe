import { Spinner, Text } from '@basiln/design-system';
import { Flex, If, Spacing } from '@basiln/utils';
import { useTheme } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { FileText, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { lastDashboardIdAtom } from '@/atoms/dashboard';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { useDashboardOutlet } from '@/hooks/dashboard/useDashboardOutlet';
import { dashboardQueries } from '@/queries/dashboard';

export const DashboardDetail = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const { openWidgetDialog } = useDashboardOutlet();
  const setLastId = useSetAtom(lastDashboardIdAtom);

  const {
    data: dashboard,
    isLoading,
    isError,
  } = useQuery(dashboardQueries.detail(id, { enabled: !!id }));

  useEffect(() => {
    if (id) setLastId(id);
  }, [id, setLastId]);

  useEffect(() => {
    if (isError) {
      navigate('/dashboards', { replace: true });
    }
  }, [isError, navigate]);

  if (isLoading) {
    return (
      <Flex>
        <Spacing size={300}></Spacing>
        <Spinner color="seedn_key" />
      </Flex>
    );
  }

  if (!id) return <div>잘못된 접근입니다.</div>;
  if (isLoading)
    return (
      <Flex css={{ height: '100%' }}>
        <Spinner color="seedn_key" />
      </Flex>
    );
  if (isError || !dashboard) return <div>대시보드를 불러오지 못했습니다.</div>;

  return (
    <div>
      <Flex justify="space-between">
        <Flex justify="flex-start" align="baseline" gap={15}>
          <Text size="title-large">{dashboard?.name}</Text>
          <If condition={!!dashboard.description}>
            <Text size="sub-small" color="gray_080">
              [{dashboard?.description}]
            </Text>
          </If>
        </Flex>
        <Flex justify="flex-end" align="center" gap={10}>
          <button
            style={{
              backgroundColor: theme.colors.seedn_key,
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              ...theme.fonts['btn-regular'],
            }}
            onClick={openWidgetDialog}
          >
            <Plus color="white" size={18} strokeWidth={3} />
            위젯 추가
          </button>
          <button
            style={{
              border: `1px solid ${theme.colors.seedn_key}`,
              color: theme.colors.seedn_key,
              borderRadius: 8,
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              ...theme.fonts['btn-regular'],
            }}
            onClick={() => navigate(`/export-preview/${id}`)}
          >
            <FileText size={18} color={theme.colors.seedn_key} />
            레포트 생성
          </button>
        </Flex>
      </Flex>
      <Spacing size={12} />
      <DashboardGrid widgets={dashboard?.widgets} onOpenDialog={openWidgetDialog} />
    </div>
  );
};
