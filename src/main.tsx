import { BasilnProvider } from '@basiln/design-system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import toast from 'react-hot-toast';
import { RouterProvider } from 'react-router';

import '@basiln/design-system/global.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { keyColorAtom } from './atoms/dashboard/index.ts';
import CustomToaster from './components/common/Toaster/index.tsx';
import router from './Router.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
    mutations: {
      retry: 0,
      onError: (error) => {
        if (!error.response || error.response?.status >= 500) {
          toast.error('오류가 발생했습니다. 다시 시도해주세요.');
        } else {
          toast.error(error.response.data?.message || '오류가 발생했습니다. 다시 시도해주세요.');
        }
      },
    },
  },
});

const App = () => {
  const keyColor = useAtomValue(keyColorAtom);

  return (
    <BasilnProvider keyColor={keyColor}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <CustomToaster />
      </QueryClientProvider>
    </BasilnProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
