"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../../server/AppError");
const models_1 = require("../../models");
function createNewPlace(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try { // Refactorear para obtener el nombre de usuario del desencriptado del token
            const { nombre, _id, comentarioCuerpo, comentarioRating, lng, lat } = req.body;
            console.log("Inside newPlace");
            let ubicacion = [];
            ubicacion.push(parseFloat(lng).toFixed(6));
            ubicacion.push(parseFloat(lat).toFixed(6));
            const creador = yield models_1.User.findById(_id);
            const lugar = new models_1.Place({ nombre: nombre, ubicacion: ubicacion, author: creador });
            const comentario = new models_1.Comment({ cuerpo: comentarioCuerpo, rating: comentarioRating, author: creador, lugar: lugar });
            creador.comentarios.push(comentario._id);
            creador.lugares.push(lugar._id);
            lugar.comentarios.push(comentario._id);
            yield creador.save();
            yield lugar.save();
            yield comentario.save();
            const response = {
                message: "Your place has been successfully posted!",
                action: "setIsOk"
            };
            res.status(201).json(response);
        }
        catch (e) {
            next(new AppError_1.AppError(500, e.message, "setIsError"));
        }
    });
}
;
exports.default = createNewPlace;
