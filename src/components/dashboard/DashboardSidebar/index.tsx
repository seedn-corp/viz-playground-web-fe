import { Button, Text } from '@basiln/design-system';
import { If } from '@basiln/utils';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';

import { lastDashboardIdAtom } from '@/atoms/dashboard';
import { useCreateDashboard } from '@/hooks/mutation/dashboard/useCreateDashboard';
import { dashboardQueries } from '@/queries/dashboard';

import { sidebarCss } from './styles';

export const DashboardSidebar = () => {
  const navigate = useNavigate();
  const { id: activeId } = useParams<{ id: string }>();

  const { data: dashboards, isLoading } = useQuery(dashboardQueries.list());
  const createMutation = useCreateDashboard();

  const setLastId = useSetAtom(lastDashboardIdAtom);

  const hasDashboards = (dashboards?.length ?? 0) > 0;

  const items = useMemo(() => dashboards ?? [], [dashboards]);

  const onCreate = () => {
    createMutation.mutate(
      { name: '새로운 대시보드' },
      {
        onSuccess: (res) => {
          const newId =
            ('dashboard' in res ? res.dashboard : undefined)?.id ??
            res.dashboard?.id ??
            res?.dashboard?.id;
          if (newId) navigate(`/dashboards/${newId}`);
        },
      },
    );
  };

  return (
    <aside css={sidebarCss.wrap}>
      <div css={sidebarCss.header}>
        <Text size="title-regular">대시보드 리스트</Text>
        <Button
          size="small"
          display="inline"
          radius="small"
          gutter="4px"
          onClick={onCreate}
          isLoading={createMutation.isPending}
        >
          + 새로 만들기
        </Button>
      </div>

      <If condition={isLoading}>
        <div css={sidebarCss.empty}>불러오는 중...</div>
      </If>

      <If condition={!isLoading && !hasDashboards}>
        <div css={sidebarCss.empty}>
          아직 대시보드가 없습니다.
          <br />
          <Button size="small" display="inline" radius="small" onClick={onCreate}>
            첫 번째 대시보드 만들기
          </Button>
        </div>
      </If>

      <If condition={!isLoading && hasDashboards}>
        <div css={sidebarCss.list}>
          {items.map((d) => (
            <div
              key={d.id}
              css={sidebarCss.item(d.id === activeId)}
              onClick={() => {
                setLastId(d.id);
                navigate(`/dashboards/${d.id}`);
              }}
              role="button"
              aria-label={`open-dashboard-${d.name}`}
            >
              <Text size="body-medium">{d.name}</Text>
            </div>
          ))}
        </div>
      </If>
    </aside>
  );
};
