import { queryOptions } from '@tanstack/react-query';

import { getAllWidget, getWidgetDetail } from '@/apis/widgets';

const queryKeyPrefix = ['widgets'] as const;

export const widgetsQueries = {
  allKey: queryKeyPrefix,

  all: (id: string) =>
    queryOptions({
      queryKey: [...queryKeyPrefix, 'all', id],
      queryFn: () => getAllWidget(id),
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: [...queryKeyPrefix, 'detail', id],
      queryFn: () => getWidgetDetail(id),
      enabled: !!id,
    }),
};
