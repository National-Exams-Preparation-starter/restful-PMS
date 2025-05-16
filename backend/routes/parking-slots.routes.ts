import { ParkingSlotController } from "../controllers/parking-slot.controller";
import { requireRole } from "../middlewares/auth.middleware";
import { Router } from "express";

const slotRouter = Router();

slotRouter.get("/", requireRole(["ADMIN"]), ParkingSlotController.getAllParkingSlots);
slotRouter.post("/", requireRole(["ADMIN"]), ParkingSlotController.createParkingSlot);
slotRouter.get("/:slotId", requireRole(["ADMIN"]), ParkingSlotController.getParkingSlotById);
slotRouter.patch("/:slotId/status", requireRole(["ADMIN"]), ParkingSlotController.updateParkingSlotStatus);
slotRouter.delete("/:slotId", requireRole(["ADMIN"]), ParkingSlotController.deleteParkingSlot);

export default slotRouter;
