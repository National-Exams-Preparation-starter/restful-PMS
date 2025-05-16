import { prisma } from "@/prisma";
import { comparePassword, hashPassword } from "@/utils/password-hash";

export class AuthService {
    // register service
  static async register(name: string, email: string, password: string) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error("User already exists");
    }

    // hashing the password
    const hashed = await hashPassword(password);

    // creating a new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: "CLIENT",
      },
    });
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({where: { email }});
    if(!user){
        throw new Error("Invalid credentials");
    }

    // compare password
    if(!(await comparePassword(password, user.password))){
        throw new Error("Invalid credentials");
    }

    // generating tokens
    // const access_token = await 
  }
}
