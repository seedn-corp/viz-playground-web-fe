import { useMutation } from '@tanstack/react-query';

import { login } from '@/apis/auth';
import { LocalStorage } from '@/utils/LocalStorage';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.success) {
        const tokenData = { accessToken: data.access_token, user: data.user };
        LocalStorage.setItem('@user-token', JSON.stringify(tokenData));
      }
    },
  });
};
