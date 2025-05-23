import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";
import type { LoginDto, RegisterDto } from "../types/auth";

const authService = new AuthService();

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => authService.getProfile(),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginDto) => authService.login(data)
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterDto) => authService.register(data)
  });
};

export const useVerifyEmail = ()=>{
  return useMutation({
    mutationFn:(code:string)=>authService.verifyEmail(code)
  })
}

export const useResendVerifyEmail = ()=>{
  return useMutation({
    mutationFn:(email:string)=>authService.resendEmailVerification(email)
  })
}
