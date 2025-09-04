import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteWidget } from '@/apis/widgets';
import { dashboardQueries } from '@/queries/dashboard';
import { widgetsQueries } from '@/queries/widgets';
import type { DeleteWidgetResponse } from '@/types/widgets';

type Vars = { id: string; dashboardId: string };

export const useDeleteWidget = () => {
  const qc = useQueryClient();

  return useMutation<DeleteWidgetResponse, unknown, Vars>({
    mutationFn: ({ id }) => deleteWidget(id),

    onSuccess: (_res, { id, dashboardId }) => {
      qc.removeQueries({
        queryKey: [...widgetsQueries.allKey, 'detail', id],
        exact: true,
      });

      qc.invalidateQueries({
        queryKey: [...widgetsQueries.allKey, 'all', dashboardId],
      });

      qc.invalidateQueries({
        queryKey: [...dashboardQueries.allKey, 'detail', dashboardId],
      });

      qc.invalidateQueries({
        queryKey: [...dashboardQueries.allKey, 'detail', dashboardId, 'raw'],
      });
    },
  });
};
