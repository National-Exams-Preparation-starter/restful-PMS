import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthProvider";
import Sidebar from "../common/Sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isAuthenticated, role } = useAuth();

  const isAdmin = role === "ADMIN";

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container py-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
