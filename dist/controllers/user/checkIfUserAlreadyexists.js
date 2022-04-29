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
const models_1 = require("../../models");
function checkIfUserAlreadyExists(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username } = req.body;
        try {
            const foundUser = yield models_1.User.findOne({ username: username }).exec();
            if (!foundUser) {
                const response = {
                    message: "That username is free ;)",
                    action: "setIsOk",
                    additionalInfo: "free"
                };
                res.status(200).json(response);
            }
            else {
                const response = {
                    message: "Oh, we are sorry, that username is already taken :(",
                    action: "setIsOk",
                    additionalInfo: "taken"
                };
                res.status(200).json(response);
            }
        }
        catch (error) {
            next(error);
            // next(new AppError(500, e.message, "setIsError"))
        }
    });
}
;
exports.default = checkIfUserAlreadyExists;
