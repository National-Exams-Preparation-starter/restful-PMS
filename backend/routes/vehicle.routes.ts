import { Router } from "express";
import { VehicleController } from "@/controllers/vehicle.controller";
import { requireRole } from "@/middlewares/auth.middleware";

const vehicleRouter = Router();

vehicleRouter.post("/create", requireRole(["ADMIN","CLIENT"]),VehicleController.create);
vehicleRouter.get("/:userId/vehicles",requireRole(["ADMIN","CLIENT"]), VehicleController.getUserVehicles);
vehicleRouter.get("/:id", requireRole(["ADMIN","CLIENT"]),VehicleController.getById);
vehicleRouter.put("/update/:id", requireRole(["ADMIN","CLIENT"]),VehicleController.update);
vehicleRouter.delete("/delete/:id", requireRole(["CLIENT"]),VehicleController.delete);

export default vehicleRouter;
