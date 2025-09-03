// src/pages/dashboard/index.tsx
import { Button, Text } from '@basiln/design-system';
import { Flex, Spacing } from '@basiln/utils';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router';

import { lastDashboardIdAtom } from '@/atoms/dashboard';
import { useCreateDashboard } from '@/hooks/mutation/dashboard/useCreateDashboard';
import { dashboardQueries } from '@/queries/dashboard';

export const DashboardIndex = () => {
  const { data } = useQuery(dashboardQueries.list());
  const lastId = useAtomValue(lastDashboardIdAtom);
  const createMutation = useCreateDashboard();

  if (!data) return null;

  if (data.length > 0) {
    const targetId = (lastId && data.find((d) => d.id === lastId)?.id) ?? data[0].id;
    return <Navigate to={`/dashboards/${targetId}`} replace />;
  }

  return (
    <Flex direction="column" align="flex-start" gap={12}>
      <Spacing size={40} />
      <Text size="title-large">첫 번째 대시보드를 만들어 보세요</Text>
      <Text size="body-medium" color="gray_060">
        왼쪽 상단 버튼으로 언제든 새 대시보드를 만들 수 있습니다.
      </Text>
      <Spacing size={10} />
      <Button
        size="regular-2"
        radius="small"
        onClick={() =>
          createMutation.mutate(
            { name: '새로운 대시보드' },
            {
              onSuccess: (res) => {
                const id = res.dashboard.id;
                window.history.replaceState(null, '', `/dashboards/${id}`);
              },
            },
          )
        }
        isLoading={createMutation.isPending}
      >
        + 대시보드 만들기
      </Button>
    </Flex>
  );
};
