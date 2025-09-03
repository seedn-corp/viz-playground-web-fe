import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/hooks/auth/useAuth';

const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
