import { useNavigate } from "react-router-dom";
import { useLogin, useRegister } from "../../hooks/use-auth";
import { Cookies } from "react-cookie";
import { useAuth } from "./AuthProvider";

export const useAuthActions = () => {
  const { setAuthState } = useAuth();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const cookies = new Cookies();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    return loginMutation.mutateAsync(
      { email, password },
      {
        onSuccess: (response) => {
          if (response.success) {
            const user = response?.data?.user;
            setAuthState({
              user,
              isAuthenticated: true,
              loading: false,
              role: user?.role,
            });
            navigate(
              user?.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"
            );
          }
        },
      }
    );
  };

  const register = async (name: string, email: string, password: string) => {
    return registerMutation.mutateAsync(
      { name, email, password },
      {
        onSuccess: (response) => {
          if (response.success) {
            const user = response?.data?.user;
            setAuthState({
              user,
              isAuthenticated: true,
              loading: false,
              role: user?.role,
            });
            navigate(
              user?.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"
            );
          }
        },
      }
    );
  };

  const logout = async () => {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
      role: undefined,
    });
    navigate("/auth/login");
  };

  return { login, register, logout };
};
