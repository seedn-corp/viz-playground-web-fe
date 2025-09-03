import axios from 'axios';

import { LocalStorage } from '@/utils/LocalStorage';

const { VITE_API_URL } = import.meta.env;

const client = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

client.interceptors.request.use(
  async (config) => {
    const tokens = LocalStorage.getItem('@user-token');
    if (tokens) {
      const { accessToken } = JSON.parse(tokens);
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 401 Unauthorized 에러 처리
    if (error.response?.status === 401) {
      // 토큰이 있는 상태에서 401 에러가 발생한 경우에만 로그아웃 처리
      const tokens = LocalStorage.getItem('@user-token');
      if (tokens) {
        LocalStorage.removeItem('@user-token');
        window.location.href = '/signin';
      }
      // 토큰이 없는 상태(로그인 시도 등)에서는 그냥 에러만 반환
    }

    // 419 에러 처리 (토큰 만료 등)
    if (error.response?.status === 419) {
      LocalStorage.removeItem('@user-token');
      window.location.href = '/signin';
    }

    return Promise.reject(error);
  },
);

export default client;
