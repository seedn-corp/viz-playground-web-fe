import { Text } from '@basiln/design-system';
import { Spacing } from '@basiln/utils';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { lastDashboardIdAtom } from '@/atoms/dashboard';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { useDashboardOutlet } from '@/hooks/dashboard/useDashboardOutlet';
import { dashboardQueries } from '@/queries/dashboard';

export const DashboardDetail = () => {
  const { id = '' } = useParams<{ id: string }>();
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

  if (!id) return <div>잘못된 접근입니다.</div>;
  if (isLoading) return <div>불러오는 중...</div>;
  if (isError || !dashboard) return <div>대시보드를 불러오지 못했습니다.</div>;

  return (
    <div>
      <Text size="title-large">{dashboard.name}</Text>
      <Spacing size={12} />
      <DashboardGrid onOpenDialog={openWidgetDialog} />
    </div>
  );
};
