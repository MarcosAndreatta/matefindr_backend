import {Request, Response, NextFunction} from "express";
import { AppError } from "../../server/AppError";
import { Place, User } from "../../models";
import jwt from "jsonwebtoken";
import { ExpressTypes, ModelsTypes } from "../../types";
async function editPlace (req: Request, res: Response, next: NextFunction) {
  try {

  const editPlace = async (id: string) => {
    try {
      const {lugar_id} = req.body;
      const place = await Place.findById(lugar_id).populate("author").exec();
      const user = await User.findById(id).exec();
      if (place!.author._id.equals(user!._id)) {
        const {nombre} = req.body;
        place!.nombre = nombre;
        await place!.save();
        const response: ExpressTypes.response = {
          message: "Edited!",
          action: "setIsOk",
        };
        res.status(200).json(response);
      } else {
        throw new AppError(500, "Yo do not own that place", "setIsError")
      }
    }
    catch (error) {
      return next(error);
    }
  };
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (!accessToken) {
    throw new AppError(401, "There was not accessToken", "setIsError");
  } else {
    jwt.verify(
      accessToken,
      process.env.SECRET as string,
      (error, resultado: any) => {
        if (error) {
          throw new AppError(
              403,
              `Error verifying accessToken: ${error}`,
              "setIsError"
            
          );
        }
         else if (!resultado) {
          throw new AppError(500, "There was no result, WTF?!");
        } else {
          editPlace(resultado.id)
        }
       
        });
  }

  }
  catch (error) {
    return next(error)
  }
};
export default editPlace