import { ParkingSlotService } from "@/services/parking-slot.service";
import ApiResponse from "@/utils/api-response";
import { NextFunction, Request, Response } from "express";

export class ParkingSlotController {
  // getting all parling slots by all users
  static async getAllParkingSlots(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { page, limit, status } = req.query;
      const slots = await ParkingSlotService.getAllSlots(
        status as any,
        Number(page),
        Number(limit)
      );
      return ApiResponse.success(res, slots, "all parking slots", 200);
    } catch (error) {
      next(error);
    }
  }

  static async createParkingSlot(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { name, location } = req.body;
      const slot = await ParkingSlotService.createParkingSlot(name, location);
      return ApiResponse.success(
        res,
        slot,
        "parking slot created successfully",
        201
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateParkingSlotStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { slotId } = req.params;
      const { status } = req.body;
      const slot = await ParkingSlotService.updateSlotStatus(
        slotId,
        status as any
      );
      return ApiResponse.success(
        res,
        slot,
        "parking slot status updated successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  }


  static async getParkingSlotById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { slotId } = req.params;
      const slot = await ParkingSlotService.getSlotById(slotId);
      return ApiResponse.success(res, slot, "parking slot", 200);
    } catch (error) {
      next(error);
    }
  }

    static async deleteParkingSlot(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
        const { slotId } = req.params;
         await ParkingSlotService.deleteParkingSlot(slotId);
        return ApiResponse.success(res, null, "parking slot deleted", 200);
        } catch (error) {
        next(error);
        }
    }
}
