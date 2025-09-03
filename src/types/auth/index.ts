// 로그인 요청 파라미터
export type LoginParams = {
  email: string;
  password: string;
};

// 로그인 응답
export type LoginResponse = {
  success: boolean;
  user: {
    id: string;
    email: string;
  };
  access_token: string;
};

// 회원가입 요청 파라미터
export type SignUpParams = {
  email: string;
  password: string;
};

// 회원가입 응답
export type SignUpResponse = {
  success: boolean;
  message: string;
};

// 로그아웃 요청 파라미터
export type LogoutParams = {
  accessToken: string;
};

// 로그아웃 응답
export type LogoutResponse = {
  success: boolean;
  message: string;
};

// 사용자 정보
export type UserInfo = {
  id: string;
  email: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: UserInfo | null;
  accessToken: string | null;
  isLoading: boolean;
};
