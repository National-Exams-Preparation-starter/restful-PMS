import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type ForgotPasswordInput,
  forgotPasswordSchema,
} from "@/lib/validations/auth-schema";

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

  const onSubmit = async (data: ForgotPasswordInput) => {};

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-[500px] space-y-6 p-4">
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
            Input your email address to fix the issue.
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
          <Button
            type="submit"
            className="w-full text-white"
            disabled={isLoading}
          >
            {isLoading && (
              <Loader2 fontSize={24} className="mr-2 animate-spin text-white" />
            )}
            {isLoading ? "Sending..." : "Send Code"}
          </Button>
          <div className="flex justify-end">
            <Link
            to="/auth/login"
            className=" text-end text-sm text-primary hover:text-primary"
          >
            back to login?
          </Link>
          </div>
          
        </form>
      </div>
    </div>
  );
}
