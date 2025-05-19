import { isAuthenticated, logout } from "@/services/utils.service";
import type React from "react";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { AuthService } from "../../services/auth.service";
import type { User } from "../../types/auth";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  const authservice = new AuthService();

  const refreshUser = async () => {
    if (!isAuthenticated()) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      console.log("fetching");

      const { data } = await authservice.getProfile();
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to get user:", error);
      toast.error("failed to load user profile");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  // Load user on mount
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        refreshUser,
        loading,
        setUser,
        user,
        isLoggedIn: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
