import editComment from "./editComment";
import newComment from "./newComment";
import deleteComment from "./deleteComment";
import express, { Router } from "express";
import {authorizeUserWithoutResponse} from "../user/authorizeUser";
class CommentController {
    userRouter: Router;
    constructor() {
        const userRouter = express.Router();
        userRouter.patch("/edit", authorizeUserWithoutResponse, editComment);
        userRouter.delete("/delete", authorizeUserWithoutResponse, deleteComment);
        userRouter.post("/new", authorizeUserWithoutResponse, newComment);
        this.userRouter = userRouter;
    }
    get getRouter() {
        return this.userRouter
    }
}
export default CommentController

