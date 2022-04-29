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
function deletePlace(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { lugar_id, autor } = req.body;
            const place = yield models_1.Place.findById(lugar_id).populate("author");
            const usuario = yield models_1.User.findByIdAndUpdate(autor, { $pull: { lugares: lugar_id } });
            //This is definetly not a good security approach, because anyone can reach this by just
            //putting the username of the owner of a place inside the request.
            //Change!!!!
            if (place.author._id.equals(usuario._id)) {
                const comentarios = yield models_1.Comment.deleteMany({ author: autor });
                //Need how to pull many comments from the user
                yield place.remove();
                const response = {
                    message: "Your place has been erased!",
                    action: "setIsOk"
                };
                res.status(200).json(response);
            }
            else {
                throw new AppError_1.AppError(401, "You do not own that place");
            }
        }
        catch (e) {
            next(new AppError_1.AppError(500, e.message, "setIsError"));
        }
    });
}
;
exports.default = deletePlace;
