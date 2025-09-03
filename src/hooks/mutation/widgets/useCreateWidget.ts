import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createWidget } from '@/apis/widgets';
import { widgetsQueries } from '@/queries/widgets';

export const useCreateWidget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: widgetsQueries.allKey });
    },
  });
};
