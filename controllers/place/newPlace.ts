import {Request, Response, NextFunction} from "express";
import { AppError } from "../../server/AppError";
import { User, Place, Comment } from "../../models";
import { ExpressTypes } from "../../types";
async function createNewPlace (req: Request, res: Response, next: NextFunction) {
    try { // Refactorear para obtener el nombre de usuario del desencriptado del token
        const {nombre, _id, comentarioCuerpo, comentarioRating, lng, lat} = req.body;
        console.log("Inside newPlace")
        let ubicacion = [];
        ubicacion.push(parseFloat(lng).toFixed(6));
        ubicacion.push(parseFloat(lat).toFixed(6));
        const creador = await User.findById(_id);
        const lugar = new Place({nombre: nombre, ubicacion: ubicacion, author: creador});
        const comentario = new Comment({cuerpo: comentarioCuerpo, rating: comentarioRating, author: creador, lugar: lugar})
        creador!.comentarios.push(comentario._id);
        creador!.lugares.push(lugar._id);
        lugar!.comentarios.push(comentario._id);
        await creador!.save();
        await lugar.save();
        await comentario.save();
        const response: ExpressTypes.response = {
          message: "Your place has been successfully posted!",
          action: "setIsOk"
        }
        res.status(201).json(response)
      }
      catch (e: any) {next(new AppError(500, e.message, "setIsError"))}
};
export default createNewPlace