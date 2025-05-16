import { prisma } from "../prisma";
import {
  PaymentStatus,
  Prisma,
  ReservationStatus,
  SlotStatus,
} from "@prisma/client";
import { differenceInMinutes } from "date-fns";

export class ReservationService {
  //   request reservation
  static async requestReservation(vehicleId: string, slotId: string) {
    const slot = await prisma.parkingSlot.findFirst({ where: { id: slotId } });
    if (!slot || slot.status !== SlotStatus.AVAILABLE) {
      throw new Error("The selected parking slot is not available.");
    }

    const reservation = await prisma.reservation.create({
      data: {
        vehicleId,
        slotId,
        status: ReservationStatus.PENDING,
      },
    });

    await prisma.parkingSlot.update({
      where: { id: slot.id },
      data: {
        status: SlotStatus.OCCUPIED,
      },
    });

    return reservation;
  }

  // approve reservation by admin
  static async approveReservation(reservationId: string) {
    const reservation = await prisma.reservation.findFirst({
      where: { id: reservationId },
    });

    if (!reservation || reservation.status !== ReservationStatus.PENDING) {
      throw new Error("reservation not found or not pending");
    }

    return prisma.reservation.update({
      where: { id: reservation.id },
      data: {
        status: ReservationStatus.APPROVED,
        startTime: new Date(),
      },
    });
  }

  // end reservation by admin
  static async endReservation(reservationId: string) {
    const reservation = await prisma.reservation.findFirst({
      where: { id: reservationId },
      include: {
        slot: true,
        vehicle: true,
      },
    });

    if (
      !reservation ||
      !reservation.startTime ||
      reservation.status !== ReservationStatus.APPROVED
    ) {
      throw new Error("reservation does not exist or completed");
    }

    const endTime = new Date();
    const minutes = differenceInMinutes(endTime, reservation.startTime);
    const rate = 200;

    const paymentAmout = minutes < 60 ? rate : (minutes / 60) * rate;

    await prisma.reservation.update({
      where: { id: reservation.id },
      data: {
        endTime,
        status: ReservationStatus.FINISHED,
        slot: {
          update: {
            status: SlotStatus.AVAILABLE,
          },
        },
      },
    });

    await prisma.payment.create({
      data: {
        amount: parseInt(paymentAmout.toFixed(0)),
        status: PaymentStatus.PENDING,
        reservationId: reservation.id,
        userId: reservation.vehicle.ownerId,
        slotId: reservation.slotId,
        vehicleId: reservation.vehicleId,
      },
    });
  }

  static async getReservationById(reservationId: string) {
    const reservation = await prisma.reservation.findFirst({
      where: { id: reservationId },
      include: {
        vehicle: true,
        slot: true,
      },
    });
    if (!reservation) throw new Error("reservation not found");

    return reservation;
  }

  static async getReservationByUserId(userId: string, page = 1, limit = 10) {
    const [reservations, total] = await Promise.all([
      prisma.reservation.findMany({
        where: {
          vehicle: {
            ownerId: userId,
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.reservation.count({
        where: {
          vehicle: {
            ownerId: userId,
          },
        },
      }),
    ]);

    return {
      data: reservations,
      meta: {
        total,
        page,
        limit,
      },
    };
  }

  static async getAllReservations(
    status?: ReservationStatus,
    page = 1,
    limit = 10
  ) {
    const [reservations, total] = await Promise.all([
      prisma.reservation.findMany({
        where: status ? { status } : undefined,
        include: {
          vehicle: {
            include: {
              owner: true,
            },
          },
          slot: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "asc" },
      }),
      prisma.reservation.count(),
    ]);

    return {
      data: reservations,
      meta: {
        total,
        page,
        limit,
      },
    };
  }
}
