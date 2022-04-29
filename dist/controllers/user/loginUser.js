"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../../server/AppError");
const models_1 = require("../../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function loginUser(req, res, next) {
    models_1.User.findOne({ username: req.body.username }, (error, result) => {
        if (!result) {
            return next(new AppError_1.AppError(500, "User not found. Try to log in again.", "setIsError"));
        }
        if (error) {
            next(new AppError_1.AppError(500, "There was a mongoose error", "setIsError"));
        }
        const isValidPassword = bcrypt_1.default.compareSync(req.body.password, result.password);
        if (!isValidPassword) {
            return next(new AppError_1.AppError(404, "Log in failed. Check your credentials and try again", "setIsError"));
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: result._id }, process.env.SECRET, { expiresIn: 360000 });
        const response = {
            message: `We are glad to see you again, ${result.username}!`,
            action: "setIsLogged",
            user: {
                username: result.username,
                _id: result._id,
                accessToken: accessToken,
            },
        };
        res.status(201).json(response);
    });
}
;
exports.default = loginUser;
