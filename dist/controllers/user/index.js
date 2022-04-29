"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginUser_1 = __importDefault(require("./loginUser"));
const registerUser_1 = __importDefault(require("./registerUser"));
const authorizeUser_1 = require("./authorizeUser");
const checkIfUserAlreadyexists_1 = __importDefault(require("./checkIfUserAlreadyexists"));
class UserController {
    constructor() {
        const userRouter = express_1.default.Router();
        userRouter.get("/authorize", authorizeUser_1.authorizeUser);
        userRouter.post("/login", loginUser_1.default);
        userRouter.post("/register", registerUser_1.default);
        userRouter.post("/checkIfUserAlreadyExists", checkIfUserAlreadyexists_1.default);
        this.userRouter = userRouter;
    }
    get getRouter() {
        return this.userRouter;
    }
}
exports.default = UserController;
