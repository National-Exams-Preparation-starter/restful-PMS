import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OTPInput } from "@/components/ui/otp-input";
import { AuthService } from "@/services/auth.service";

export default function Verify() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  if (!email) {
    navigate("/auth/forgot-password");
    return null;
  }

  const handleVerify = async (code: string) => {
    if (code.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    const loadingToast = toast.loading("Verifying OTP...");
    try {
      setIsLoading(true);
      const authService = AuthService.getInstance();
      await authService.verifyOtp({ code, email });

      toast.success("OTP verified successfully!", {
        id: loadingToast,
      });

      navigate("/auth/reset-password", { state: { email, code } });
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message || "Invalid OTP"
          : "Invalid OTP";

      toast.error(errorMessage, {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    const loadingToast = toast.loading("Resending OTP...");
    try {
      setIsResending(true);
      const authService = AuthService.getInstance();
      await authService.resendOtp(email);

      toast.success("OTP resent successfully!", {
        id: loadingToast,
      });
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message || "Failed to resend OTP"
          : "Failed to resend OTP";

      toast.error(errorMessage, {
        id: loadingToast,
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-[500px] space-y-6 p-4">
        <Link
          to="/auth/forgot-password"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>

        <div className="flex flex-col items-center justify-center">
          <div className="h-16 w-16 mb-6">
            <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl text-primary">🔑</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center">OTP Verification</h1>
          <p className="mt-2 text-sm text-center text-muted-foreground max-w-[400px]">
            We've sent an OTP code check your email{" "}
            <span className="font-medium text-foreground">({email})</span> and
            fill it in.
          </p>
        </div>

        <div className="space-y-4">
          <OTPInput
            onComplete={(value) => setOtp(value)}
            className="justify-center"
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || otp.length !== 6}
            onClick={() => handleVerify(otp)}
          >
            {isLoading ? "Verifying..." : "Submit"}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                onClick={handleResend}
                disabled={isResending}
                className="text-primary hover:underline disabled:opacity-50"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
