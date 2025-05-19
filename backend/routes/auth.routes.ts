import { validate } from "../middlewares/req-validation.middleware";
import { AuthController } from "../controllers/auth.controller";
import { requireRole } from "../middlewares/auth.middleware";
import { Router } from "express";
import { loginSchema } from "../validation/auth-validation";
import { loginLimiter } from "../middlewares/rate-limitter";

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post(
  "/login",
  loginLimiter,
  validate(loginSchema),
  AuthController.login
);

authRouter.post("/verify-email", AuthController.verifyEmail);
authRouter.post(
  "/resend-verification-email",
  AuthController.resendVerificationCode
);

authRouter.post("/forgot-password", AuthController.forgotPassword);
authRouter.post("/reset-password", AuthController.resetPassword);

authRouter.get(
  "/me",
  requireRole(["ADMIN", "CLIENT"]),
  AuthController.getLoggedInUser
);

export default authRouter;
