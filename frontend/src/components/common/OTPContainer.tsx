import React, { FC } from "react";
import { OTPInput } from "../ui/otp-input";
type props = {
  setCode: React.Dispatch<React.SetStateAction<string>>;
};
const OTPContainer: FC<props> = ({ setCode }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center">
        <div className="h-16 w-16 mb-6">
          <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-2xl text-primary">🔑</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center">OTP Verification</h1>
        <p className="mt-2 text-sm text-center text-muted-foreground max-w-[400px]">
          We've sent an OTP code check your email
        </p>
      </div>
      <div>
        <OTPInput
          onComplete={(value) => setCode(value)}
          className="justify-center"
        />
      </div>
    </div>
  );
};

export default OTPContainer;
