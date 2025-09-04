import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateWidget } from '@/apis/widgets';
import { widgetsQueries } from '@/queries/widgets';

export const useUpdateWidget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: widgetsQueries.allKey });
    },
  });
};
