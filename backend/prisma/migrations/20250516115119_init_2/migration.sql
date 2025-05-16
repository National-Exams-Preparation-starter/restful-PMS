-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "passwordResetCode" TEXT,
ADD COLUMN     "passwordResetCodeExpiry" TIMESTAMP(3),
ADD COLUMN     "verificationCode" TEXT,
ADD COLUMN     "verificationCodeExpiry" TIMESTAMP(3);
