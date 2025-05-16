import ApiResponse from "../utils/api-response";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Welcome to our Parking management system API" });
});


export default router;