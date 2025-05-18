import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  className?: string;
}

export function OTPInput({ length = 6, onComplete, className }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Check if input is not empty then focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    const otpValue = newOtp.join("");
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty and backspace is pressed, focus previous input
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, length);
    if (isNaN(Number(pasteData))) return;

    const newOtp = [...otp];
    pasteData.split("").forEach((char, index) => {
      if (index < length) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
    // Focus last filled input or first empty input
    const lastFilledIndex = newOtp
      .slice()
      .reverse()
      .findIndex((digit: string) => digit !== "");
    const reversedIndex =
      lastFilledIndex === -1 ? -1 : newOtp.length - 1 - lastFilledIndex;
    const focusIndex =
      reversedIndex < length - 1 ? reversedIndex + 1 : reversedIndex;
    inputRefs.current[focusIndex].focus();

    if (pasteData.length === length && onComplete) {
      onComplete(pasteData);
    }
  };

  return (
    <div className={cn("flex gap-4", className)}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(ref) => {
            if (ref) inputRefs.current[index] = ref;
          }}
          className="h-14 w-14 rounded-lg border border-input bg-background text-center text-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0"
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
