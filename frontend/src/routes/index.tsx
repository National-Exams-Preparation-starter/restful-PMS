import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminPage from "@/pages/admin/AdminPage";
import VerifyEmail from "@/pages/auth/verify/VerifyEmail";
import ClientDashboard from "@/pages/client/ClientDashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "../pages/auth/forgot-password";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Vehicles from "@/pages/client/Vehicles";
import Reservations from "@/pages/client/Reservations";
import Payments from "@/pages/client/Payments";


const PagesRoutes = () => {
  return (
    <Routes>
      {/* auth pages */}
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/verify-email" element={<VerifyEmail />} />

      {/* auth required routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ClientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vehicles"
        element={
          <ProtectedRoute>
            <Vehicles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reservations"
        element={
          <ProtectedRoute>
            <Reservations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        }
      />

      {/* admin only routes */}
      <Route
      path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      


      <Route //* Redirect root to dashboard if authenticated, otherwise to login
        path="/"
        element={<Navigate to={"/auth/login"}/>}
      />
    </Routes>
  );
};


export default PagesRoutes;