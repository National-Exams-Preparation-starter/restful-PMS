import type { LoginDto, RegisterDto, User } from "../types/auth";
import { authorizedAPI, unauthorizedAPI } from "../utils/axios.config";
import { handleApiRequest } from "./utils.service";
import {type apiResponse } from "@/types/common";

export class AuthService {
  // registering a new user
  register(userData: RegisterDto): Promise<apiResponse<User>> {
    return handleApiRequest(() =>
      unauthorizedAPI.post("/auth/register", userData)
    );
  }

  //   logging in the new user
  login(
    userData: LoginDto
  ): Promise<apiResponse<{ user: User; access_token: string }>> {
    return handleApiRequest(() =>
      unauthorizedAPI.post("/auth/login", userData)
    );
  }

  //   getting the current user profile
  getProfile(): Promise<apiResponse<User>> {
    return handleApiRequest(() => authorizedAPI.get("/auth/me"));
  }

  verifyEmail(code:string):Promise<apiResponse<null>>{
    return handleApiRequest(()=>unauthorizedAPI.post("/auth/verify-email",{code}))
  }
}
