import {Request, Response, NextFunction} from "express";
import { AppError } from "../../server/AppError";
import { Place } from "../../models"; 
async function getPlaces (req: Request, res: Response, next: NextFunction) {
    try {
        const places = await Place.find().exec();
        res.status(201).json(places);
      }
    catch (e: any) {next(new AppError(500, e.message, "setIsError"))}
};
export default getPlaces