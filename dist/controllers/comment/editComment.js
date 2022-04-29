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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../../server/AppError");
const models_1 = require("../../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function editComment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const editComment = (id) => __awaiter(this, void 0, void 0, function* () {
                const comentario = yield models_1.Comment.findById(req.body.comentario_id).populate("author").exec();
                const user = yield models_1.User.findById(id).exec();
                if (comentario.author._id.equals(user._id)) {
                    const { cuerpo, rating } = req.body;
                    comentario.cuerpo = cuerpo;
                    comentario.rating = rating;
                    yield comentario.save();
                    const response = {
                        message: "Edited!",
                        action: "setIsOk",
                    };
                    res.status(200).json(response);
                }
                else {
                    throw new AppError_1.AppError(500, "You do not own that comment", "setIsError");
                }
            });
            const authHeader = req.headers["authorization"];
            const accessToken = authHeader && authHeader.split(" ")[1];
            if (!accessToken) {
                throw new AppError_1.AppError(401, "There was not accessToken", "setIsError");
            }
            else {
                jsonwebtoken_1.default.verify(accessToken, process.env.SECRET, (error, resultado) => {
                    if (error) {
                        throw new AppError_1.AppError(403, `Error verifying accessToken: ${error}`, "setIsError");
                    }
                    else if (!resultado) {
                        throw new AppError_1.AppError(500, "Strage error", "setIsError");
                    }
                    else {
                        editComment(resultado.id);
                    }
                });
            }
        }
        catch (error) {
            return next(error);
        }
    });
}
;
exports.default = editComment;
