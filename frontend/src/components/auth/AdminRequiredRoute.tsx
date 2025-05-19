import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthProvider";
import LoadingScreen from "../common/LoadingScreen";

interface AdminRequiredRouteProps {
  children: ReactNode;
}

export default function AdminRequiredRoute({
  children,
}: AdminRequiredRouteProps) {
  const { user,loading,isLoggedIn} = useAuth();
  const isAdmin = user?.role === "ADMIN";

  if (loading) return <LoadingScreen />;

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}
