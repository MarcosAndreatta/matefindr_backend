import {Request, Response, NextFunction} from "express";
import { AppError } from "../../server/AppError";
import { User, Comment } from "../../models";
import jwt from "jsonwebtoken"; 
import { ExpressTypes } from "../../types";
async function editComment (req: Request, res: Response, next: NextFunction) {
  try {

  const editComment = async (id: string) => {
    const comentario = await Comment.findById(req.body.comentario_id).populate("author").exec();
    const user = await User.findById(id).exec();
    if (comentario!.author._id.equals(user!._id)) {
      const { cuerpo, rating } = req.body;
      comentario!.cuerpo = cuerpo;
      comentario!.rating = rating;
      await comentario!.save();
      const response: ExpressTypes.response = {
        message: "Edited!",
        action: "setIsOk",
      };
      res.status(200).json(response);
    } else {
      throw new AppError(500, "You do not own that comment", "setIsError")
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
        } else if (!resultado) {
          throw new AppError(500, "Strage error", "setIsError")
        } else {
          editComment(resultado.id)
        }
      }
    );
  }
  }
  catch (error) {
    return next(error)
  }
};
export default editComment