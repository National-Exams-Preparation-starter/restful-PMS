import { prisma } from "@/prisma";
import { PaymentStatus } from "@prisma/client";

export class PaymentClass {
  static async getAllPayments(status?: PaymentStatus, page = 1, limit = 10) {
    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where: status ? { status } : undefined,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: {
            select: {
              name: true,
            },
          },
          vehicle: {
            select: {
              plateNumber: true,
            },
          },
          slot: {
            select: {
              name: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      }),
      prisma.payment.count(),
    ]);

    return {
      data: payments,
      meta: {
        total,
        page,
        limit,
      },
    };
  }

  static async approvePayment(paymentId: string) {
    const payment = await prisma.payment.findFirst({
      where: { id: paymentId },
    });

    if (!payment || payment.status !== PaymentStatus.PENDING)
      throw new Error("Payment not Found or Completed");

    return prisma.payment.update({
        where:{id:payment.id},
        data:{
            status:PaymentStatus.COMPLETED
        }
    })
  }
}
