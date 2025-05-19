import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { useRegister, useResendVerifyEmail } from "@/hooks/use-auth";
import {
  type RegisterInput,
  registerSchema,
} from "@/lib/validations/auth-schema";
import { Loader2 } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useRegister();

  const onSubmit = async (data: RegisterInput) => {
    registerMutation.mutateAsync(data, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success(response.message);
          navigate("/auth/verify-email", {
            state: { email: response.data?.email },
          });
        }
      },
    });
  };

  const isLoading = registerMutation.isPending;
  

  return (
    <div className="flex h-screen items-center justify-center">
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
            <Input id="names" placeholder="John Doe" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
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
          <Button
            type="submit"
            className="w-full text-white"
            disabled={isLoading}
          >
            {isLoading && (
              <Loader2 fontSize={24} className="mr-2 animate-spin text-white" />
            )}
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
      <div className="bg-primary h-full w-[40%] hidden lg:block"></div>
    </div>
  );
}
