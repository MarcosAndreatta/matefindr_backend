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
function getPlaces(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const places = yield models_1.Place.find().exec();
            res.status(201).json(places);
        }
        catch (e) {
            next(new AppError_1.AppError(500, e.message, "setIsError"));
        }
    });
}
;
exports.default = getPlaces;
