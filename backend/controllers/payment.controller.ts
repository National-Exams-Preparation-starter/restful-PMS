import { Request, Response, NextFunction } from "express";
import { PaymentClass } from "@/services/payment.service";
import ApiResponse from "@/utils/api-response";
import { PaymentStatus } from "@prisma/client";

export class PaymentController {
  // Get all payments (with optional status filter and pagination)
  static async getAllPayments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { status, page = 1, limit = 10 } = req.query;

      const result = await PaymentClass.getAllPayments(
        status as PaymentStatus,
        Number(page),
        Number(limit)
      );

      return ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  // Approve a payment
  static async approvePayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;

      const updatedPayment = await PaymentClass.approvePayment(id);

      return ApiResponse.success(
        res,
        updatedPayment,
        "Payment approved successfully"
      );
    } catch (error) {
      next(error);
    }
  }
}
