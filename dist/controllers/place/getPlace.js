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
function getPlace(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        models_1.Place.findById(id, null, null, (error, result) => {
            if (error) {
                next(new AppError_1.AppError(500, error.message, "setIsError"));
            }
            else if (!result) {
                const response = {
                    message: "That place does no longer exist",
                    action: "setIsError"
                };
                res.status(500).json(response);
            }
            else {
                const response = {
                    message: "Place found",
                    action: "setIsOk",
                    lugar: result
                };
                res.status(200).json(response);
            }
        })
            .populate({ path: "author", select: "-password" })
            .populate({ path: "comentarios", populate: { path: "author", select: "-password" } });
    });
}
;
exports.default = getPlace;
