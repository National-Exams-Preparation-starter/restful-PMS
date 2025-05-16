import { JwtService } from '@/utils/jwt-service';
import { Request, Response, NextFunction } from 'express';

// Middleware to check if the user has the required role
export const requireRole = (allowedRoles: ("admin" | "client")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify and decode the token
    const user = JwtService.verifyToken(token, "access");

    if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Check if the user's role is allowed for this route
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient privileges" });
    }

    // attaching the user to the request object
    //@ts-ignore
    req.user = user;
    next();
  };
};
