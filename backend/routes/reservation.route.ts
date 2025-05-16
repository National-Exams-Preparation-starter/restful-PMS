import { Router } from "express";
import { ReservationController } from "../controllers/reservation.controller";
import { requireRole } from "../middlewares/auth.middleware";

const reservationRouter = Router();

reservationRouter.post("/", requireRole(["ADMIN","CLIENT"]),ReservationController.requestReservation);
reservationRouter.post("/:id/approve", requireRole(["ADMIN"]), ReservationController.approveReservation);
reservationRouter.post("/:id/end", requireRole(["ADMIN"]),ReservationController.endReservation);

reservationRouter.get("/me", requireRole(["ADMIN","CLIENT"]),ReservationController.getMyReservations);
reservationRouter.get("/:id", requireRole(["ADMIN","CLIENT"]),ReservationController.getReservationById);
reservationRouter.get("/", requireRole(["ADMIN"]), ReservationController.getAllReservations);

export default reservationRouter;
