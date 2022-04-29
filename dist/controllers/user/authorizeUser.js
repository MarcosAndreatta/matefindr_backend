"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUserWithoutResponse = exports.authorizeUser = void 0;
const AppError_1 = require("../../server/AppError");
const models_1 = require("../../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorizeUser = function (req, res, next) {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (!accessToken) {
        return next(new AppError_1.AppError(401, "There was not accessToken", "setIsError"));
    }
    else {
        jsonwebtoken_1.default.verify(accessToken, process.env.SECRET, (error, result) => {
            if (error) {
                return next(new AppError_1.AppError(403, "Try log in again :S", "setIsError")
                //Because if an user stays in a page, and in the meanwhile the token get expired, I don't
                //want the user to see the specific error is thwrowed, so I hide this.
                // new AppError(
                //   403,
                //   `${error}`,
                //   "setIsError"
                // )
                );
            }
            if (!result) {
                return next(new AppError_1.AppError(500, "There was not result. Database error?"));
            }
            models_1.User.findById(result.id, (error, result) => {
                if (error) {
                    return next(new AppError_1.AppError(403, "Error reaching the database to search for the user", "setIsError"));
                }
                const response = {
                    message: `Welcome back ${result.username}!`,
                    action: "setIsAutorizado",
                    user: {
                        username: result.username,
                        _id: result._id,
                        accessToken: accessToken, // revisar
                    },
                };
                res.status(201).json(response);
                next();
            });
        });
    }
};
exports.authorizeUser = authorizeUser;
const authorizeUserWithoutResponse = function (req, res, next) {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (!accessToken) {
        return next(new AppError_1.AppError(401, "There was not accessToken", "setIsError"));
    }
    else {
        jsonwebtoken_1.default.verify(accessToken, process.env.SECRET, (error, result) => {
            if (error) {
                return next(new AppError_1.AppError(403, "Try log in again :S", "setIsError")
                //Because if an user stays in a page, and in the meanwhile the token get expired, I don't
                //want the user to see the specific error is thwrowed, so I hide this.
                // new AppError(
                //   403,
                //   `${error}`,
                //   "setIsError"
                // )
                );
            }
            if (!result) {
                return next(new AppError_1.AppError(500, "There was not result. Database error?"));
            }
            models_1.User.findById(result.id, (error, result) => {
                if (error) {
                    return next(new AppError_1.AppError(403, "Error reaching the database to search for the user", "setIsError"));
                }
                next();
            });
        });
    }
};
exports.authorizeUserWithoutResponse = authorizeUserWithoutResponse;
