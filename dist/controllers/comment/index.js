"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const editComment_1 = __importDefault(require("./editComment"));
const newComment_1 = __importDefault(require("./newComment"));
const deleteComment_1 = __importDefault(require("./deleteComment"));
const express_1 = __importDefault(require("express"));
const authorizeUser_1 = require("../user/authorizeUser");
class CommentController {
    constructor() {
        const userRouter = express_1.default.Router();
        userRouter.patch("/edit", authorizeUser_1.authorizeUserWithoutResponse, editComment_1.default);
        userRouter.delete("/delete", authorizeUser_1.authorizeUserWithoutResponse, deleteComment_1.default);
        userRouter.post("/new", authorizeUser_1.authorizeUserWithoutResponse, newComment_1.default);
        this.userRouter = userRouter;
    }
    get getRouter() {
        return this.userRouter;
    }
}
exports.default = CommentController;
