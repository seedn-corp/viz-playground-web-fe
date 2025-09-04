import { Button, IconButton, Text } from '@basiln/design-system';
import { If } from '@basiln/utils';
import { useTheme } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { Pin, PinOff, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';

import { lastDashboardIdAtom, sidebarPinnedAtom } from '@/atoms/dashboard';
import { useCreateDashboard } from '@/hooks/mutation/dashboard/useCreateDashboard';
import { dashboardQueries } from '@/queries/dashboard';

import { sidebarCss } from './styles';

export const DashboardSidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id: activeId } = useParams<{ id: string }>();

  const { data: dashboards, isLoading } = useQuery(dashboardQueries.list());
  const createMutation = useCreateDashboard();

  const setLastId = useSetAtom(lastDashboardIdAtom);
  const [isPinned, setIsPinned] = useAtom(sidebarPinnedAtom);

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
    <aside css={sidebarCss.wrap()}>
      <div css={sidebarCss.header()}>
        <div css={sidebarCss.titleRow()}>
          <Text size="title-regular">대시보드 리스트</Text>
          <IconButton
            variant="ghost"
            size="small"
            icon={isPinned ? <Pin size={16} /> : <PinOff size={16} />}
            onClick={() => setIsPinned(!isPinned)}
            title={isPinned ? "사이드바 고정 해제" : "사이드바 고정"}
          />
        </div>
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
              <IconButton
                variant="ghost"
                size="small"
                icon={<Trash2 color={theme.colors.gray_060} />}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </div>
          ))}
        </div>
      </If>
    </aside>
  );
};
