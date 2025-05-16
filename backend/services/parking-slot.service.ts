import { prisma } from "../prisma";
import { SlotStatus } from "@prisma/client";

export class ParkingSlotService {
  // creating parking slot by admin
  static async createParkingSlot(name: string, location: string) {
    const slot = await prisma.parkingSlot.findUnique({ where: { name } });
    if (slot) {
      throw new Error("Parking slot already exists");
    }

    const newSlot = await prisma.parkingSlot.create({
      data: {
        name,
        location,
      },
    });

    return newSlot;
  }

  //   updating parking slot by admin
  static async updateSlotStatus(slotId: string, status: SlotStatus) {
    const slot = await prisma.parkingSlot.findFirst({ where: { id: slotId } });
    if (!slot) {
      throw new Error("Parking slot not found");
    }
    const updatedSlot = await prisma.parkingSlot.update({
      where: { id: slotId },
      data: {
        status,
      },
    });

    return updatedSlot;
  }

  //   get slots by id
  static async getSlotById(slotId: string) {
    const slot = await prisma.parkingSlot.findFirst({ where: { id: slotId } });
    if (!slot) {
      throw new Error("Parking slot not found");
    }
    return slot;
  }

  //   getting all parking slots and paginating them
  static async getAllSlots(status?: SlotStatus, page = 1, limit = 10) {
    const where = status ? { status } : {};

    const [slots, totalSlots] = await Promise.all([
      prisma.parkingSlot.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.parkingSlot.count(),
    ]);

    return {
      data: slots,
      meta: {
        total: totalSlots,
        page,
        limit,
        totalPages: Math.ceil(totalSlots / limit),
      },
    };
  }

  //   deleting parking slot by admin
  static async deleteParkingSlot(slotId: string) {
    const slot = await prisma.parkingSlot.findFirst({ where: { id: slotId } });
    if (!slot) {
      throw new Error("Parking slot not found");
    }
    await prisma.parkingSlot.delete({ where: { id: slot.id } });
  }
}
