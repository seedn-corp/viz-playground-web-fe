import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteDashboard } from '@/apis/dashboard';
import { dashboardQueries } from '@/queries/dashboard';
import type { DeleteDashboardResponse } from '@/types/dashboard';

export const useDeleteDashboard = () => {
  const qc = useQueryClient();
  return useMutation<DeleteDashboardResponse, unknown, string>({
    mutationFn: (id) => deleteDashboard(id),
    onSuccess: (_res, id) => {
      qc.removeQueries({ queryKey: [...dashboardQueries.allKey, 'detail', id] });
      qc.invalidateQueries({ queryKey: dashboardQueries.allKey });
    },
  });
};
