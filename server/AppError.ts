import { ExpressTypes } from "../types";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
export class AppError extends Error {  
    constructor (public status: number, public message: string, action?: ExpressTypes.setter) {
        super(message);
    }
};
export const errorMiddleware: ErrorRequestHandler = (error: AppError, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    let response: ExpressTypes.response = {
        message: error.message,
        action: "setIsError"
    };
    res.status(error.status).json(response)
};