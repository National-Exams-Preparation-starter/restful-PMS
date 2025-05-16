import { Router } from "express";
import { PaymentController } from "@/controllers/payment.controller";
import { requireRole } from "@/middlewares/auth.middleware";

const paymentRouter = Router();

// Get all payments
paymentRouter.get("/", requireRole(["ADMIN"]), PaymentController.getAllPayments);

// Approve a payment
paymentRouter.post("/:id/approve", requireRole(["ADMIN"]), PaymentController.approvePayment);

export default paymentRouter;
