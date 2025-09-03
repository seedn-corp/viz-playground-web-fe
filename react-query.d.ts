import type { AxiosError } from 'axios';

import type { DefaultResponse } from './src/types/common/index';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<DefaultResponse>;
  }
}
