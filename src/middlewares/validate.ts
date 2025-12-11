import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = <T extends ZodSchema>(schema: T) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: result.error,
            });
        }

        req.body = result.data;
        next();
    };
};

export const validateQuery = <T extends ZodSchema>(schema: T) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const queryParams: Record<string, any> = { ...req.query };

        if (req.query.value && typeof req.query.value === "string") {
            queryParams.value = Number(req.query.value);
        }

        const result = schema.safeParse(queryParams);

        if (!result.success) {
            return res.status(400).json({
                error: "Query validation failed",
                details: result.error,
            });
        }
        (req as any).validatedQuery = result.data;
        next();
    };
};
