import { useState, useEffect } from 'react';

import type { AuthState } from '@/types/auth';
import { LocalStorage } from '@/utils/LocalStorage';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    isLoading: true,
  });

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const tokenData = LocalStorage.getItem('@user-token');

        if (tokenData) {
          const { accessToken, user } = JSON.parse(tokenData);

          if (accessToken && user) {
            setAuthState({
              isAuthenticated: true,
              user,
              accessToken,
              isLoading: false,
            });
            return;
          }
        }

        setAuthState({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          isLoading: false,
        });
      } catch {
        setAuthState({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          isLoading: false,
        });
      }
    };

    checkAuthStatus();

    // LocalStorage 변경 감지를 위한 이벤트 리스너
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === '@user-token') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    ...authState,
  };
};
