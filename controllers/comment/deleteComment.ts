import {Request, Response, NextFunction} from "express";
import { AppError } from "../../server/AppError";
import { Place, Comment, User } from "../../models"; 
import { ExpressTypes } from "../../types";
async function deleteComment (req: Request, res: Response, next: NextFunction) {
  try {
    const {comentario_id, currentlyLoggedUser} = req.body;
    const comentario = await Comment.findById(comentario_id).populate("author").populate("lugar");
    //This is definetly not a good security approach, because anyone can reach this by just
    //putting the username of the owner of a place inside the request.
    //Change!!!!
    if (comentario!.author._id.equals(currentlyLoggedUser)) {
      await User.findByIdAndUpdate(comentario!.author._id, {$pull: {comentarios: comentario_id}});
      await Place.findByIdAndUpdate(comentario!.lugar._id, {$pull: {comentarios: comentario_id}});
      await comentario!.remove();
    const response: ExpressTypes.response = {
      message: "Your comment has been erased!",
      action: "setIsOk"
    };
    res.status(200).json(response)
    } else {
      const response: ExpressTypes.response = {
        message: "Good try, but you are not the owner!",
        action: "setIsError"
      };
      res.status(200).json(response); 
    }
    
  }
  catch (e: any) {next(new AppError(500, e.message, "setIsError"))}
};
export default deleteComment