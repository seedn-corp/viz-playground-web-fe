import type { DashboardDetail, DashboardDetailUI } from '@/types/dashboard';

import { safeParseJson } from './json';

export const normalizeDashboard = <C = unknown, D = unknown>(
  d: DashboardDetail,
): DashboardDetailUI<C, D> => ({
  ...d,
  widgets: d.widgets.map((w) => ({
    ...w,
    configObj:
      typeof w.config === 'string' ? safeParseJson<C>(w.config) : ((w.config ?? null) as C | null),
    processedData:
      typeof w.processed_data === 'string'
        ? safeParseJson<D>(w.processed_data)
        : ((w.processed_data ?? null) as D | null),
  })),
});
