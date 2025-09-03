import { queryOptions } from '@tanstack/react-query';

import { listDashboards, getDashboard } from '@/apis/dashboard';
import type { DashboardDetail, DashboardDetailUI, DashboardSummary } from '@/types/dashboard';
import { normalizeDashboard } from '@/utils/dashboard/normalizeDashboard';

const keyPrefix = ['dashboards'] as const;

export const dashboardQueries = {
  allKey: keyPrefix,

  list: () =>
    queryOptions({
      queryKey: [...keyPrefix, 'list'],
      queryFn: listDashboards,
      select: (res) => res.dashboards as DashboardSummary[],
      staleTime: 30 * 1000,
      retry: 3,
    }),

  detailRaw: (id: string, opts?: { enabled?: boolean }) =>
    queryOptions({
      queryKey: [...keyPrefix, 'detail', id, 'raw'],
      queryFn: () => getDashboard(id),
      enabled: !!id && (opts?.enabled ?? true),
      select: (res) => res.dashboard as DashboardDetail,
      staleTime: 10 * 1000,
      retry: 3,
    }),

  detail: (id: string, opts?: { enabled?: boolean }) =>
    queryOptions({
      queryKey: [...keyPrefix, 'detail', id],
      queryFn: () => getDashboard(id),
      enabled: !!id && (opts?.enabled ?? true),
      select: (res) => normalizeDashboard(res.dashboard) as DashboardDetailUI,
      staleTime: 10 * 1000,
      retry: 3,
    }),
};
