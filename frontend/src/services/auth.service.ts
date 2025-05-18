import { LoginDto, RegisterDto } from "../types/auth";
import { authorizedAPI, unauthorizedAPI } from "../utils/axios.config";
import { handleApiRequest } from "./utils.service";

export class AuthService {
  // registering a new user
  register(userData: RegisterDto): Promise<any> {
    return handleApiRequest(() =>
      unauthorizedAPI.post("/auth/register", userData)
    );
  }

  //   logging in the new user
  login(userData: LoginDto): Promise<any> {
    return handleApiRequest(() =>
      unauthorizedAPI.post("/auth/login", userData)
    );
  }

  //   getting the current user profile
  getProfile(): Promise<any> {
    return handleApiRequest(() => authorizedAPI.get("/profile/me"));
  }
}
