import deletePlace from "./deletePlace";
import editPlace from "./editPlace";
import createNewPlace from "./newPlace";
import getPlace from "./getPlace";
import getPlaces from "./getPlaces";
import express, { Router } from "express";
import {authorizeUserWithoutResponse} from "../user/authorizeUser";
class PlaceController {
    userRouter: Router;
    constructor() {
        const userRouter = express.Router();
        userRouter.get("/show", getPlaces);
        userRouter.get("/show/:id", getPlace);
        userRouter.patch("/edit", authorizeUserWithoutResponse, editPlace);
        userRouter.delete("/delete", authorizeUserWithoutResponse, deletePlace);
        userRouter.post("/new", authorizeUserWithoutResponse,/*Add joi validation schema*/ createNewPlace);
        this.userRouter = userRouter;
    }
    get getRouter() {
        return this.userRouter
    }
}
export default PlaceController

