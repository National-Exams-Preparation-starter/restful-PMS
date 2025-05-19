import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { type InputHTMLAttributes, useState } from "react";
import { type UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  register: UseFormRegister<any>;
  name: string;
}

const FormInput = ({
  label,
  error,
  register,
  name,
  type,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="block font-medium text-sm">{label}</label>
      <div className="flex flex-col gap-[2px]">
        <div className="relative flex items-center rounded-xl bg-[#F7F9FA]">
          <Input
            {...register(name)}
            {...rest}
            autoCapitalize="none"
            className="p-4 w-full rounded-md focus-visible:ring-1 focus-visible:!ring-blue-400"
            type={type === "password" && showPassword ? "text" : type}
          />
          {type === "password" ? (
            <button
              className="absolute right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          ) : null}
        </div>
        {error && <p className="text-error text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default FormInput;
