import ApiResponse from "../utils/api-response";
import { JwtService } from "../utils/jwt-service";
import { Request, Response, NextFunction } from "express";

// auth middleware
export const requireRole = (allowedRoles: ("ADMIN" | "CLIENT")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
       res.status(401).json({ message: "No token provided" });
       return;
    }
    
    // verifying the token
    try {
      const user = JwtService.verifyToken<{
        email: string;
        role: "ADMIN" | "CLIENT";
      }>(token, "access");
      
      if (user && !allowedRoles.includes(user.role)) {
        ApiResponse.error(
          res,
          "Access denied: insufficient privileges",
          403
        );
        return;
      }

      // Attach the user to the request object
      //@ts-ignore
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};
