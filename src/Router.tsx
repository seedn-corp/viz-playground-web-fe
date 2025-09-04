import { createBrowserRouter, redirect } from 'react-router';
import { Navigate } from 'react-router';

import PrivateRoute from '@/components/common/routes/PrivateRoute';
import PublicRoute from '@/components/common/routes/PublicRoute';
import Chart from '@/pages/chart';
import { DashboardIndex } from '@/pages/dashboard';
import { DashboardDetail } from '@/pages/dashboard/detail';
import { DashboardLayout } from '@/pages/dashboard/Layout';
import SignIn from '@/pages/signIn';
import SignUp from '@/pages/signUp';
import { TableWidgetPage } from '@/pages/table';

const ErrorEl = <div>에러가 발생했습니다.</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute />,
    errorElement: ErrorEl,
    children: [
      { path: '/signin', element: <SignIn /> },
      { path: '/signup', element: <SignUp /> },
    ],
  },

  {
    path: '/',
    element: <PrivateRoute />,
    errorElement: ErrorEl,
    children: [
      { index: true, element: <Navigate to="/dashboards" replace /> },

      {
        path: '/dashboards',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardIndex /> },
          { path: ':id', element: <DashboardDetail /> },
        ],
      },

      { path: '/chart', element: <Chart />, children: [{ path: ':id', element: <Chart /> }] },

      {
        path: '/table',
        element: <TableWidgetPage />,
        children: [{ path: ':id', element: <TableWidgetPage /> }],
      },
    ],
  },

  { path: '*', loader: async () => redirect('/') },
]);

export default router;
