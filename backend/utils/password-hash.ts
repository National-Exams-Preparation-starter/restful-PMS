import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const genSalt = 12;
  return await bcrypt.hash(password, genSalt);
};

export const comparePassword = async (
  inPassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(inPassword, userPassword);
};
