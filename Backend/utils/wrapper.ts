import type { NextFunction, Request, Response } from "express";
import { ApplicationError, InternalServerError } from "./errors";
// import { winstonLogger } from "./winstonLogger";

export const asyncWrapper =
    (fn: (req: Request, res: Response) => Promise<void>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res);
        } catch (err) {
            if (err instanceof ApplicationError) {
                next(err);
                return;
            }
            const internalServerError = new InternalServerError();
            next(internalServerError);
        }
    };
