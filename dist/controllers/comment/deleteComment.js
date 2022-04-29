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
function deleteComment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { comentario_id, currentlyLoggedUser } = req.body;
            const comentario = yield models_1.Comment.findById(comentario_id).populate("author").populate("lugar");
            //This is definetly not a good security approach, because anyone can reach this by just
            //putting the username of the owner of a place inside the request.
            //Change!!!!
            if (comentario.author._id.equals(currentlyLoggedUser)) {
                yield models_1.User.findByIdAndUpdate(comentario.author._id, { $pull: { comentarios: comentario_id } });
                yield models_1.Place.findByIdAndUpdate(comentario.lugar._id, { $pull: { comentarios: comentario_id } });
                yield comentario.remove();
                const response = {
                    message: "Your comment has been erased!",
                    action: "setIsOk"
                };
                res.status(200).json(response);
            }
            else {
                const response = {
                    message: "Good try, but you are not the owner!",
                    action: "setIsError"
                };
                res.status(200).json(response);
            }
        }
        catch (e) {
            next(new AppError_1.AppError(500, e.message, "setIsError"));
        }
    });
}
;
exports.default = deleteComment;
