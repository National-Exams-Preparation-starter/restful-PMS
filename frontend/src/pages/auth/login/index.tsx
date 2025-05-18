import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthService } from "@/services/auth.service";
import { AxiosError } from "axios";
import { LoginInput, loginSchema } from "@/lib/validations/auth-schema";
import { useLogin } from "@/hooks/use-auth";
import { useAuth } from "@/context/auth/AuthProvider";

export default function Login() {
  const { setAuthState } = useAuth();
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
 
  const loginMutation = useLogin();
  const onSubmit = async (data: LoginInput) => {
    loginMutation.mutateAsync(data, {
      onSuccess: (response) => {
        if (response.success) {
          const user = response?.data?.user;
          setAuthState({
            user,
            isAuthenticated: true,
            loading: false,
            role: user?.role,
          });
          navigate(user?.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
        }
      },
    });
  };

  const isLoading = loginMutation.isPending

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-[500px] space-y-6 p-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-sm text-muted-foreground">
            Fill in your credentials to login
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="text-right">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-primary hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
