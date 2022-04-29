import {Request, Response, NextFunction} from "express";
import { AppError } from "../../server/AppError";
import { User } from "../../models";
import jwt from "jsonwebtoken";
import { ExpressTypes } from "../../types";

async function checkIfUserAlreadyExists (req: Request, res: Response, next: NextFunction) {
    const {username} = req.body;
      try {
        const foundUser = await User.findOne({username: username}).exec();
        if (!foundUser) {
          const response: ExpressTypes.response = {
            message: "That username is free ;)",
            action: "setIsOk",
            additionalInfo: "free"
          };
          res.status(200).json(response)
        } else {
          const response: ExpressTypes.response = {
            message: "Oh, we are sorry, that username is already taken :(",
            action: "setIsOk",
            additionalInfo: "taken"
          }
          res.status(200).json(response)
        }
        
      }
      catch (error: any) {
        next(error)
        // next(new AppError(500, e.message, "setIsError"))
      }
};
export default checkIfUserAlreadyExists