import { Router, Request, Response } from "express";
import authRouter from "./auth.routes";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Welcome to our Parking management system API" });
});

router.use("/auth",authRouter);


export default router;