import { Request, Response, NextFunction } from "express";
import { ReservationService } from "@/services/reservation.service";
import ApiResponse from "@/utils/api-response";
import { ReservationStatus } from "@prisma/client";

export class ReservationController {
  static async requestReservation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { vehicleId, slotId } = req.body;

      const reservation = await ReservationService.requestReservation(
        vehicleId,
        slotId
      );
      return ApiResponse.success(
        res,
        reservation,
        "Reservation requested successfully",
        201
      );
    } catch (error) {
      next(error);
    }
  }

  static async approveReservation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const reservation = await ReservationService.approveReservation(id);
      return ApiResponse.success(
        res,
        reservation,
        "Reservation approved successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  static async endReservation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      await ReservationService.endReservation(id);
      return ApiResponse.success(
        res,
        null,
        "Reservation ended and payment initiated."
      );
    } catch (error) {
      next(error);
    }
  }

  static async getReservationById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const reservation = await ReservationService.getReservationById(id);
      return ApiResponse.success(res, reservation);
    } catch (error) {
      next(error);
    }
  }

  static async getMyReservations(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      //@ts-ignore
      const userId = req.user.id;
      const { page = 1, limit = 10 } = req.query;

      const reservations = await ReservationService.getReservationByUserId(
        userId,
        Number(page),
        Number(limit)
      );

      return ApiResponse.success(res, reservations);
    } catch (error) {
      next(error);
    }
  }

  static async getAllReservations(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { status, page = 1, limit = 10 } = req.query;

      const reservations = await ReservationService.getAllReservations(
        status as ReservationStatus,
        Number(page),
        Number(limit)
      );

      return ApiResponse.success(res, reservations);
    } catch (error) {
      next(error);
    }
  }
}
