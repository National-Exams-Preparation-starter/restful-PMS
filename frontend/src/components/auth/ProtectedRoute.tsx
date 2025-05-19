
import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useAuth } from '@/context/auth/AuthProvider';
import LoadingScreen from '../common/LoadingScreen';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn, loading, user } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (loading) return <LoadingScreen/>

  // If not logged in, redirect to login
  if (!isLoggedIn || user === null) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If this is an admin route but the user is not an admin
  if (isAdminRoute && user?.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }

  // If this is a customer route but the user is an admin (and they didn't come directly here)
  if (!isAdminRoute && user?.role === 'ADMIN' && location.key === 'default') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
