import {type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthProvider";
import LoadingScreen from "../common/LoadingScreen";

interface AuthRequiredRouteProps {
  children: ReactNode;
}

export default function AuthRequiredRoute({
  children,
}: AuthRequiredRouteProps) {
  const { user,loading,isLoggedIn} = useAuth();
  const isClient = user?.role === "CLIENT";

  if (loading) return <LoadingScreen />;

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  if (!isClient) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}
