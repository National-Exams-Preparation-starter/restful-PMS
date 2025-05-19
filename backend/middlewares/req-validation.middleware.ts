import ApiResponse from "../utils/api-response";
import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

export const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (err: any) {
      const message = err.errors ? err.errors.join(", ") : "Invalid request";
      return ApiResponse.error(res, message, 400);
    }
  };
