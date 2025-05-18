import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/validations/auth";
import { AuthService } from "@/services/auth.service";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    const loadingToast = toast.loading("Sending recovery email...");
    try {
      setIsLoading(true);
      const authService = AuthService.getInstance();
      await authService.forgotPassword(data);

      toast.success("Recovery email sent successfully!", {
        id: loadingToast,
      });
      navigate("/auth/verify", { state: { email: data.email } });
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message || "Failed to send recovery email"
          : "Failed to send recovery email";

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
          to="/auth/login"
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

          <h1 className="text-2xl font-bold text-center">Recover password</h1>
          <p className="mt-2 text-sm text-center text-muted-foreground max-w-[400px]">
            Opps. It happens to the best of us. Input your email address to fix
            the issue.
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
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
}
