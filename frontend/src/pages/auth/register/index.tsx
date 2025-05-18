/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { AuthService } from "@/services/auth.service";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    const loadingToast = toast.loading("Creating your account...");
    try {
      setIsLoading(true);
      const authService = AuthService.getInstance();
      const response = await authService.register(data);

      // Store the token in localStorage or your preferred storage method
      localStorage.setItem("token", response.token);

      toast.success("Account created successfully!", {
        id: loadingToast,
      });

      // Redirect to dashboard or home page
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message || "Failed to create account"
          : "Failed to create account";

      toast.error(errorMessage, {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-[500px] space-y-6 p-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to create your account
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="names">Full Name</Label>
            <Input id="names" placeholder="John Doe" {...register("names")} />
            {errors.names && (
              <p className="text-sm text-red-500">{errors.names.message}</p>
            )}
          </div>
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
            <Label htmlFor="telephone">Phone Number</Label>
            <Input
              id="telephone"
              placeholder="+250700000000"
              type="tel"
              {...register("telephone")}
            />
            {errors.telephone && (
              <p className="text-sm text-red-500">{errors.telephone.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="Create a password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
