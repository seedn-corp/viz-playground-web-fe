import { Spinner, Text } from '@basiln/design-system';
import { Flex, If, Spacing } from '@basiln/utils';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { lastDashboardIdAtom } from '@/atoms/dashboard';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { useDashboardOutlet } from '@/hooks/dashboard/useDashboardOutlet';
import { dashboardQueries } from '@/queries/dashboard';

export const DashboardDetail = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
      <Flex justify="flex-start" align="baseline" gap={15}>
        <Text size="title-large">{dashboard?.name}</Text>
        <If condition={!!dashboard.description}>
          <Text size="sub-small" color="gray_080">
            [{dashboard?.description}]
          </Text>
        </If>
      </Flex>
      <Spacing size={12} />
      <DashboardGrid widgets={dashboard?.widgets} onOpenDialog={openWidgetDialog} />
    </div>
  );
};
