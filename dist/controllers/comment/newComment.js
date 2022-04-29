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
function newComment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const makeComment = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findById(id).exec();
                const { cuerpo, rating, lugar_id } = req.body;
                const newComment = new models_1.Comment({ cuerpo: cuerpo, rating: rating, author: user, lugar: lugar_id });
                const place = yield models_1.Place.findById(lugar_id).exec();
                place === null || place === void 0 ? void 0 : place.comentarios.push(newComment._id);
                user === null || user === void 0 ? void 0 : user.comentarios.push(newComment._id);
                yield newComment.save();
                yield place.save();
                yield user.save();
                const response = {
                    message: "Your comment has been successfully posted!",
                    action: "setIsOk"
                };
                res.status(201).json(response);
            }
            catch (error) {
                next(new AppError_1.AppError(500, error.message, "setIsError"));
            }
        });
        const authHeader = req.headers["authorization"];
        const accessToken = authHeader && authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(accessToken, process.env.SECRET, (error, result) => {
            if (error) {
                return next(new AppError_1.AppError(403, `Error verifying the token: ${error}. Try to log in again`, "setIsError"));
            }
            else if (!result) {
                return next(new AppError_1.AppError(500, "There was not result. Database error?"));
            }
            makeComment(result.id);
        });
    });
}
;
exports.default = newComment;
