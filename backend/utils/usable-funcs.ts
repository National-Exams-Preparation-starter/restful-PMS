import crypto from "crypto";

export const generateRandomCode = (): string => {
  const randomInt = crypto.randomInt(0, 1000000);
  return randomInt.toString().padStart(6, '0');
};
