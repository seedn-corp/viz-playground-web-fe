import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logout } from '@/apis/auth';
import { LocalStorage } from '@/utils/LocalStorage';

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      LocalStorage.removeItem('@user-token');
      queryClient.clear();
    },
  });
};
