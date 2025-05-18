import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthProvider";

interface AdminRequiredRouteProps {
  children: ReactNode;
}

export default function AdminRequiredRoute({
  children,
}: AdminRequiredRouteProps) {
  const { isAuthenticated, role } = useAuth();
  const isAdmin = role === "ADMIN";

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}
