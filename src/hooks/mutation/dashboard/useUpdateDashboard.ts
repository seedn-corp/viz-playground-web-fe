import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateDashboard } from '@/apis/dashboard';
import { dashboardQueries } from '@/queries/dashboard';
import type { UpdateDashboardParams, UpdateDashboardResponse } from '@/types/dashboard';

export const useUpdateDashboard = (id: string) => {
  const qc = useQueryClient();
  return useMutation<UpdateDashboardResponse, unknown, UpdateDashboardParams>({
    mutationFn: (params) => updateDashboard(id, params),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: dashboardQueries.allKey });
    },
  });
};
