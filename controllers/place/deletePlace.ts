import {Request, Response, NextFunction} from "express";
import { AppError } from "../../server/AppError";
import { Place, User, Comment } from "../../models";
import { ExpressTypes } from "../../types";
async function deletePlace (req: Request, res: Response, next: NextFunction) {
    try {
        const {lugar_id, autor} = req.body;
        const place = await Place.findById(lugar_id).populate("author");
        const usuario = await User.findByIdAndUpdate(autor, {$pull: {lugares: lugar_id}});
        
        //This is definetly not a good security approach, because anyone can reach this by just
        //putting the username of the owner of a place inside the request.
        //Change!!!!
        if (place!.author._id.equals(usuario!._id)) {
            const comentarios = await Comment.deleteMany({author: autor});
        //Need how to pull many comments from the user
            await place!.remove();
            const response: ExpressTypes.response = {
                message: "Your place has been erased!",
                action: "setIsOk"
            };
          res.status(200).json(response)
        } else {
          throw new AppError(401, "You do not own that place");
        }
      }
      catch (e: any) {next(new AppError(500, e.message, "setIsError"))}
};
export default deletePlace