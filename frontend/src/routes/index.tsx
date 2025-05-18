import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";
import ForgotPassword from "../pages/auth/forgot-password";
import Verify from "../pages/auth/verify";
import ResetPassword from "../pages/auth/reset";

const client = new QueryClient();

const PagesRoutes = () => {
  return (
    <Routes>
      {/* auth pages */}
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/verify" element={<Verify />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};
