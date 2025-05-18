import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthProvider";

interface AuthRequiredRouteProps {
  children: ReactNode;
}

export default function AuthRequiredRoute({
  children,
}: AuthRequiredRouteProps) {
  const { isAuthenticated, role } = useAuth();
  const isClient = role === "CLIENT";

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isClient) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}
