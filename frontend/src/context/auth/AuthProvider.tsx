import type React from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthService } from "../../services/auth.service";
import { Cookies } from "react-cookie";
import { AuthState } from "../../types/auth";
import { useLogin, useRegister } from "../../hooks/use-auth";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  role: undefined,
  loading: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>(initialState);

  const navigate = useNavigate();
  const cookies = new Cookies();

  const authService = new AuthService();

  const accessToken = cookies.get("accessToken");

  useEffect(() => {
    const getMe = async () => {
      try {
        if (accessToken) {
          const response = await authService.getProfile();
          if (response.success) {
            const user = response.data;
            setState({
              user: user,
              isAuthenticated: true,
              loading: false,
              role: user?.role,
            });
            if (user?.role === "ADMIN") {
              navigate("/admin/dashboard");
            } else if (user?.role === "CLIENT") {
              navigate("/dashboard");
            }
          }
        }
      } catch (error) {
        navigate("/auth/login");
      }
    };

    getMe();
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setAuthState: setState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
