import { useMutation, useQueryClient } from '@tanstack/react-query';

import { widgetsQueries } from '@/queries/widgets';
import { createWidget } from '@/apis/widgets';

export const useCreateWidget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: widgetsQueries.allKey });
    },
  });
};
