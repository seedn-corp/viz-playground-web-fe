import client from '@/apis/client';
import type {
  LoginParams,
  LoginResponse,
  LogoutParams,
  LogoutResponse,
  SignUpParams,
  SignUpResponse,
} from '@/types/auth';

// 로그인
export const login = async (params: LoginParams): Promise<LoginResponse> => {
  const { data } = await client.post('/api/auth/login', params);
  return data;
};

// 회원가입
export const signUp = async (params: SignUpParams): Promise<SignUpResponse> => {
  const { data } = await client.post('/api/auth/signup', params);
  return data;
};

// 로그아웃
export const logout = async (params: LogoutParams): Promise<LogoutResponse> => {
  const { data } = await client.post('/api/auth/logout', params);
  return data;
};
