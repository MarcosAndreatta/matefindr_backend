import {Request, Response, NextFunction} from "express";
import { AppError } from "../../server/AppError";
import { Place, User, Comment } from "../../models"; 
import jwt from "jsonwebtoken";
import { ExpressTypes, ModelsTypes } from "../../types";
async function newComment (req: Request, res: Response, next: NextFunction) {
  const makeComment = async (id: string) => {
    try {
      const user = await User.findById(id).exec();
      const {cuerpo, rating, lugar_id} = req.body; 
      const newComment = new Comment({cuerpo: cuerpo, rating: rating, author: user, lugar: lugar_id});
      const place = await Place.findById(lugar_id).exec();
      place?.comentarios.push(newComment._id);
      user?.comentarios.push(newComment._id);
      await newComment.save();
      await place!.save();
      await user!.save();
      const response: ExpressTypes.response = {
        message: "Your comment has been successfully posted!",
        action: "setIsOk"
      };
      res.status(201).json(response);
    }
    catch (error: any) {
      next(new AppError(500, error.message, "setIsError"))
    }
  };

  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  jwt.verify(
    accessToken as string,
    process.env.SECRET as string,
    (error, result: any) => {
      if (error) {
        return next(new AppError( 403,
          `Error verifying the token: ${error}. Try to log in again`,
          "setIsError")) 
      }
      else if (!result) {
        return next(new AppError(500, "There was not result. Database error?"));
     }
     makeComment(result.id)
    }
  );
};
export default newComment