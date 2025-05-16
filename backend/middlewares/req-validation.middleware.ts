import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

export const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (err: any) {
      const message = err.errors ? err.errors.join(", ") : "Invalid request";
      res.status(400).json({ success: false, message });
    }
  };
