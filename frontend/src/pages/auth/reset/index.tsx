import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthService } from "@/services/auth.service";
import { resetPasswordSchema } from "@/lib/validations/auth";
import type { ResetPasswordInput } from "@/lib/validations/auth";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get email and OTP from state or redirect to forgot password
  const { email, code } = location.state || {};
  useEffect(() => {
    if (!email || !code) {
      navigate("/auth/forgot-password");
    }
  }, [email, code, navigate]);

  const form = useForm<ResetPasswordInput & { confirmPassword: string }>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (
    values: ResetPasswordInput & { confirmPassword: string },
  ) => {
    const loadingToast = toast.loading("Resetting password...");
    try {
      setIsLoading(true);
      const authService = AuthService.getInstance();
      await authService.resetPassword({
        email,
        otp: code,
        password: values.password,
      });

      toast.success("Password reset successfully!", {
        id: loadingToast,
      });

      // Redirect to login page
      navigate("/auth/login");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message || "Failed to reset password"
          : "Failed to reset password";

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
        <Link
          to="/auth/verify"
          state={{ email }}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>

        <div className="flex flex-col items-center justify-center">
          {/* You can add your logo here */}
          <div className="h-16 w-16 mb-6">
            {/* Replace with your actual logo */}
            <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl text-primary">🔑</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center">Set new password</h1>
          <p className="mt-2 text-sm text-center text-muted-foreground">
            Enter your new password below
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Minimum 8 characters"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Minimum 8 characters"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save new password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
