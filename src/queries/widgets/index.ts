import { getWidgetDetail } from '@/apis/widgets';
import { queryOptions } from '@tanstack/react-query';

const queryKeyPrefix = ['widgets'] as const;

export const widgetsQueries = {
  allKey: queryKeyPrefix,

  detail: (id: string) =>
    queryOptions({
      queryKey: [...queryKeyPrefix, 'detail', id],
      queryFn: () => getWidgetDetail(id),
      enabled: !!id,
    }),
};
