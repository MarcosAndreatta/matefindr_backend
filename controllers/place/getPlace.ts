import {Request, Response, NextFunction} from "express";
import { AppError } from "../../server/AppError";
import { Place } from "../../models"; 
import { ExpressTypes } from "../../types";
async function getPlace (req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    Place.findById(id, null, null, (error, result) => {
        if (error) {
          next(new AppError(500, error.message, "setIsError"))
        } else if (!result) { 
          const response: ExpressTypes.placeResponse = {
            message: "That place does no longer exist",
            action: "setIsError"
          };
          res.status(500).json(response)
        } else {
          const response: ExpressTypes.placeResponse = {
                message: "Place found",
                 action: "setIsOk",
                 lugar: result
               };
            res.status(200).json(response)
        }
      })
      .populate({path: "author", select: "-password"})
      .populate({path: "comentarios", populate: {path: "author", select: "-password"}});
};
export default getPlace