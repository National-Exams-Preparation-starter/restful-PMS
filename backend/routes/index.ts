import { Router, Request, Response } from "express";
import authRouter from "./auth.routes";
import vehicleRouter from "./vehicle.routes";
import reservationRouter from "./reservation.route";
import paymentRouter from "./payment.route";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Welcome to our Parking management system API" });
});

router.use("/auth", authRouter);
router.use("/vehicles", vehicleRouter);
router.use("/reservations", reservationRouter);
router.use("/payments", paymentRouter);

export default router;
