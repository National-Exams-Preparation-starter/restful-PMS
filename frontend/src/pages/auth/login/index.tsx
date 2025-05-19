import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth/AuthProvider";
import { useLogin } from "@/hooks/use-auth";
import { type LoginInput, loginSchema } from "@/lib/validations/auth-schema";
import type { User } from "@/types/auth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const { setUser } = useAuth();
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
          const user = response.data?.user;
          setUser(user as User);
          localStorage.setItem(
            "access_token",
            response.data?.access_token as string
          );
          navigate(user?.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
        }else{
          toast.error(response.message)
        }
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });
  };

  const isLoading = loginMutation.isPending;

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-primary h-full w-[40%] hidden lg:block"></div>
      <div className="mx-auto w-full max-w-[500px] space-y-6 p-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-sm text ">Enter your credentials to login</p>
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
          <Button
            type="submit"
            className="w-full text-white"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 animate-spin text-white" />}
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
