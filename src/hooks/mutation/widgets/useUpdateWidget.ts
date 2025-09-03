import { useMutation, useQueryClient } from '@tanstack/react-query';

import { widgetsQueries } from '@/queries/widgets';
import { updateWidget } from '@/apis/widgets';

export const useUpdateWidget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: widgetsQueries.allKey });
    },
  });
};
