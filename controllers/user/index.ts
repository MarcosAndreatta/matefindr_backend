import express, { Router } from "express";
import loginUser from "./loginUser";
import registerUser from "./registerUser";
import {authorizeUser} from "./authorizeUser";
import checkIfUserAlreadyExists from "./checkIfUserAlreadyexists";
class UserController {
    userRouter: Router;
    constructor() {
        const userRouter = express.Router();
        userRouter.get("/authorize", authorizeUser)
        userRouter.post("/login", loginUser);
        userRouter.post("/register", registerUser);
        userRouter.post("/checkIfUserAlreadyExists", checkIfUserAlreadyExists);
        this.userRouter = userRouter;
    }
    get getRouter() {
        return this.userRouter
    }
}
export default UserController

