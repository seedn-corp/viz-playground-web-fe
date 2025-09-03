import { createBrowserRouter, redirect } from 'react-router';

import PrivateRoute from '@/components/common/routes/PrivateRoute';
import PublicRoute from '@/components/common/routes/PublicRoute';

import Chart from './pages/chart';
import { Home } from './pages/home';
import SignIn from './pages/signIn';
import { TableWidgetPage } from './pages/table';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute />,
    errorElement: <div>에러가 발생했습니다.</div>,
    children: [
      {
        path: '/signin',
        element: <SignIn />,
      },
    ],
  },
  {
    path: '/',
    element: <PrivateRoute />,
    errorElement: <div>에러가 발생했습니다.</div>,
    children: [
      {
        index: true,
        loader: async () => redirect('/dashboard'),
      },
      {
        path: '/dashboard',
        element: <Home />,
      },
      {
        path: '/chart',
        element: <Chart />,
      },
      {
        path: '/table',
        element: <TableWidgetPage />,
      },
    ],
  },
]);

export default router;
