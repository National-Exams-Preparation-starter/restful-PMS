import OTPContainer from "@/components/common/OTPContainer";
import { Button } from "@/components/ui/button";
import { useResendVerifyEmail, useVerifyEmail } from "@/hooks/use-auth";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [code, setCode] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const { email } = location.state;

  const verifyEmailMutation = useVerifyEmail();
  const resendEmailMutation = useResendVerifyEmail();

  const handleVerifyEmail = async () => {
    if (!code) {
      toast.error("otp code is required");
      return;
    }
    verifyEmailMutation.mutateAsync(code, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success(response.message);
          navigate("/auth/login");
        } else {
          toast.error("verification failed, retry again");
        }
      },
    });
  };

  const handleResendCode = async () => {
    if (email) {
      resendEmailMutation.mutateAsync(email, {
        onSuccess: (response) => {
          if (response.success) {
            toast.success(response.message);
          } else {
            toast.error("an Error occured, try again");
          }
        },
      });
    }
  };

  const isLoading = verifyEmailMutation.isPending;
  const isResendLoading = resendEmailMutation.isPending;
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-[500px] space-y-6 p-4">
        <OTPContainer setCode={setCode} email={email} />

        <div className="space-y-4">
          <Button
            type="submit"
            className="w-full text-white"
            disabled={isLoading || code.length !== 6}
            onClick={handleVerifyEmail}
          >
            {isLoading && <Loader2 className="animate-spin mr-2 text-white" />}
            {isLoading ? "Verifying..." : "Submit"}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                onClick={handleResendCode}
                disabled={isResendLoading}
                className="text-primary hover:underline disabled:opacity-50"
              >
                {isResendLoading ? "Resending..." : "Resend"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
