import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteDashboard } from '@/apis/dashboard';
import { dashboardQueries } from '@/queries/dashboard';
import type { DeleteDashboardResponse } from '@/types/dashboard';

export const useDeleteDashboard = () => {
  const qc = useQueryClient();
  return useMutation<DeleteDashboardResponse, unknown, string>({
    mutationFn: (id) => deleteDashboard(id),
    onSuccess: async (_res, id) => {
      await qc.cancelQueries({ queryKey: [...dashboardQueries.allKey, 'detail', id] });
      await qc.cancelQueries({ queryKey: [...dashboardQueries.allKey, 'detail', id, 'raw'] });
      qc.removeQueries({ queryKey: [...dashboardQueries.allKey, 'detail', id] });
      qc.removeQueries({ queryKey: [...dashboardQueries.allKey, 'detail', id, 'raw'] });

      qc.invalidateQueries({ queryKey: dashboardQueries.allKey });
    },
  });
};
