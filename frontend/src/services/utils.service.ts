import { Cookies } from "react-cookie";
import axios from "axios";

const cookies = new Cookies();

// Helper function for API requests
export const handleApiRequest = async (
  apiCall: () => Promise<any>
): Promise<any> => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data;
      return errorData;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("access_token") !== null;
};

export const logout = () => {
  localStorage.removeItem("access_token");
  window.location.href = "/auth/login";
};

export const handleUnauthorized = (router: any) => {
  cookies.remove("accessToken", { path: "/" });
  cookies.remove("refreshToken", { path: "/" });
  router.push("/auth/login");
  return;
};
