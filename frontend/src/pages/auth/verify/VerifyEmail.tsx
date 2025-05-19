import OTPContainer from "@/components/common/OTPContainer";
import { Button } from "@/components/ui/button";
import { useVerifyEmail } from "@/hooks/use-auth";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [code, setCode] = useState<string>("");
  const navigate = useNavigate();

  const verifyEmailMutation = useVerifyEmail();

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
        }
      },
    });
  };

  const handleResendCode = async ()=>{

  }

  const isLoading = verifyEmailMutation.isPending;

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

        <OTPContainer setCode={setCode} />

        <div className="space-y-4">
          <Button
            type="submit"
            className="w-full"
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
                // disabled={isResending}
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
};

export default VerifyEmail;
