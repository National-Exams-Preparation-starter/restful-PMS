import jwt, {
  SignOptions,
  JwtPayload,
  VerifyErrors,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import { jwtConfigs } from "../config/jwt.config";

type tokenType = "access" | "refresh";

class jwtServiceClass {
    //   getting the secret key
  private getSecretKey(type: tokenType): string {
    return type === "access"
      ? jwtConfigs.access_token_secret_key
      : jwtConfigs.refresh_token_secret_key;
  }

//   getting the expiration time
  private getExpry(type: tokenType): string {
    return type === "access"
      ? jwtConfigs.access_token_expiration_time
      : jwtConfigs.refresh_token_expiration_time;
  }
 
//   getting the signing options
  private getSignOptions(type: tokenType): any {
    return {
      expiresIn: this.getExpry(type),
      algorithm: jwtConfigs.algorithm,
    };
  }

//   signing the token
  public signToken(payload: Record<string, any>, type: tokenType): string {
    return jwt.sign(
      payload,
      this.getSecretKey(type),
      this.getSignOptions(type)
    );
  }

//   verifying the token
  public verifyToken<T extends object = JwtPayload>(
    token: string,
    type: tokenType
  ): T | null {
    try {
      return jwt.verify(token, this.getSecretKey(type)) as T;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new Error("TOKEN_EXPIRED");
      } else if (error instanceof JsonWebTokenError) {
        throw new Error("TOKEN_INVALID");
      }
      throw new Error("TOKEN_VERIFICATION_FAILED");
    }
  }

//   decoding the token
  public decodeToken(token: string): JwtPayload | null {
    const decoded = jwt.decode(token);
    return typeof decoded === "object" && decoded !== null
      ? (decoded as JwtPayload)
      : null;
  }
}

export const JwtService = new jwtServiceClass();
