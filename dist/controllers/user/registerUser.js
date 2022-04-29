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
const models_1 = require("../../models");
const AppError_1 = require("../../server/AppError");
const bcrypt_1 = __importDefault(require("bcrypt"));
function registerUser(req, res, next) {
    const createUser = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = new models_1.User({
                username: req.body.username,
                password: bcrypt_1.default.hashSync(req.body.password, 8),
            });
            const userCreated = yield user.save();
            const response = {
                message: `Thanks for joining MateFindr, ${userCreated.username}. You can now log in`,
                action: "setIsOk",
            };
            res.status(201).json(response);
        }
        catch (error) {
            next(new AppError_1.AppError(500, `Error trying to register: ${error.message}`, "setIsError"));
        }
    });
    if (req.body.password === "") {
        return next(new AppError_1.AppError(500, "The password field cannot be blank", "setIsError"));
    }
    else {
        models_1.User.find({ username: req.body.username }, null, null, (error, result) => {
            if (error) {
                return next(new AppError_1.AppError(500, "Error reaching the database", "setIsError"));
            }
            else if (result.length === 0) {
                createUser();
            }
            else {
                next(new AppError_1.AppError(500, "An user has already registered using that username :(", "setIsError"));
            }
        });
    }
}
;
exports.default = registerUser;
