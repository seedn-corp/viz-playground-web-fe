import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createWidget } from '@/apis/widgets';
import { widgetsQueries } from '@/queries/widgets';
import { dashboardQueries } from '@/queries/dashboard';

export const useCreateWidget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: widgetsQueries.allKey });
      queryClient.invalidateQueries({ queryKey: dashboardQueries.allKey });
    },
  });
};
