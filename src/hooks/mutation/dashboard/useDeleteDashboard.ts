// src/hooks/mutation/dashboard/useDeleteDashboard.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteDashboard } from '@/apis/dashboard';
import { dashboardQueries } from '@/queries/dashboard';
import type { DeleteDashboardResponse, GetDashboardsResponse } from '@/types/dashboard';

const listKey = [...dashboardQueries.allKey, 'list'] as const;

export const useDeleteDashboard = () => {
  const qc = useQueryClient();

  return useMutation<DeleteDashboardResponse, unknown, string, { prev?: GetDashboardsResponse }>({
    mutationFn: (id) => deleteDashboard(id),

    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: listKey });

      const prev = qc.getQueryData<GetDashboardsResponse>(listKey);
      if (prev) {
        const next: GetDashboardsResponse = {
          ...prev,
          dashboards: prev.dashboards.filter((d) => d.id !== id),
        };

        qc.setQueryData(listKey, next);
      }

      qc.removeQueries({ queryKey: [...dashboardQueries.allKey, 'detail', id], exact: true });
      qc.removeQueries({
        queryKey: [...dashboardQueries.allKey, 'detail', id, 'raw'],
        exact: true,
      });

      return { prev };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(listKey, ctx.prev);
    },

    onSuccess: (_res, id) => {
      qc.removeQueries({ queryKey: [...dashboardQueries.allKey, 'detail', id], exact: true });
      qc.removeQueries({
        queryKey: [...dashboardQueries.allKey, 'detail', id, 'raw'],
        exact: true,
      });
    },
  });
};
