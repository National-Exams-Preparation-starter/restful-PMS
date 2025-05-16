import { Request, Response, NextFunction } from "express";
import { VehicleService } from "@/services/vehicle.service";
import ApiResponse from "@/utils/api-response";

export class VehicleController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { plateNumber, type } = req.body;
      //@ts-ignore
      const ownerId = req.user.id;

      const vehicle = await VehicleService.createVehicle(
        plateNumber,
        type,
        ownerId
      );
      return ApiResponse.success(
        res,
        vehicle,
        "Vehicle created successfully",
        201
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const vehicle = await VehicleService.getVehicleById(id);
      return ApiResponse.success(res, vehicle);
    } catch (error) {
      next(error);
    }
  }

  static async getUserVehicles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { userId } = req.params;
    //@ts-ignore
      const ownerId = userId ? userId : req.user.id;
      const vehicles = await VehicleService.getUserVehicles(ownerId);
      return ApiResponse.success(res, vehicles);
    } catch (error) {
      next(error);
    }
  }

  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const { plateNumber, type } = req.body;

      const vehicle = await VehicleService.updateVehicle(id, {
        plateNumber,
        type,
      });
      return ApiResponse.success(res, vehicle, "Vehicle updated successfully");
    } catch (error) {
      next(error);
    }
  }

  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      await VehicleService.deleteVehicle(id);
      return ApiResponse.success(res, null, "Vehicle deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}
