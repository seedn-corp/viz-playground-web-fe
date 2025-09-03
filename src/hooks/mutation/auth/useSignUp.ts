import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/apis/auth';

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};
