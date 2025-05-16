import { prisma } from "../prisma";

export class VehicleService {
  // Create a new vehicle for a user
  static async createVehicle(
    plateNumber: string,
    type: string,
    ownerId: string
  ) {
    const existing = await prisma.vehicle.findUnique({
      where: { plateNumber },
    });
    if (existing) {
      throw new Error("A vehicle with this plate number already exists.");
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        plateNumber,
        type,
        ownerId,
      },
    });

    return vehicle;
  }

  // Get a single vehicle by ID
  static async getVehicleById(id: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      
    });

    if (!vehicle) {
      throw new Error("Vehicle not found.");
    }

    return vehicle;
  }

  // Get all vehicles owned by a user
  static async getUserVehicles(ownerId: string) {
    const vehicles = await prisma.vehicle.findMany({
      where: { ownerId },
      orderBy: { plateNumber: "asc" },
    });

    return vehicles;
  }

  // Update vehicle details
  static async updateVehicle(
    id: string,
    data: { plateNumber?: string; type?: string }
  ) {
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data,
    });

    return vehicle;
  }

  // Delete a vehicle
  static async deleteVehicle(id: string) {
    return await prisma.vehicle.delete({
      where: { id },
    });
  }
}
