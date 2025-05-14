import ApiResponse from "@/utils/api-response";
import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  // Default error structure
  if (error.name === "TokenExpiredError") {
    return ApiResponse.error(res, "Token has expired", 401);
  }

  if (error.name === "JsonWebTokenError") {
    return ApiResponse.error(res, "Invalid token", 401);
  }

  if (error.message === "TOKEN_VERIFICATION_FAILED") {
    return ApiResponse.error(res, "Token verification failed", 500);
  }

  const message = error.message || "Internal server error";
  const statusCode = message == "Internal server error" ? 500 : 400;

  // Catch-all error (for other unexpected errors)
  return ApiResponse.error(res, message, statusCode);
};

export default errorMiddleware;
