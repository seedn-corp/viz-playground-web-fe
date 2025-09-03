import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createDashboard } from '@/apis/dashboard';
import { dashboardQueries } from '@/queries/dashboard';
import type { CreateDashboardParams, CreateDashboardResponse } from '@/types/dashboard';

export const useCreateDashboard = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateDashboardResponse, unknown, CreateDashboardParams>({
    mutationFn: createDashboard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardQueries.allKey });
    },
  });
};
