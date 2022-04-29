"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deletePlace_1 = __importDefault(require("./deletePlace"));
const editPlace_1 = __importDefault(require("./editPlace"));
const newPlace_1 = __importDefault(require("./newPlace"));
const getPlace_1 = __importDefault(require("./getPlace"));
const getPlaces_1 = __importDefault(require("./getPlaces"));
const express_1 = __importDefault(require("express"));
const authorizeUser_1 = require("../user/authorizeUser");
class PlaceController {
    constructor() {
        const userRouter = express_1.default.Router();
        userRouter.get("/show", getPlaces_1.default);
        userRouter.get("/show/:id", getPlace_1.default);
        userRouter.patch("/edit", authorizeUser_1.authorizeUserWithoutResponse, editPlace_1.default);
        userRouter.delete("/delete", authorizeUser_1.authorizeUserWithoutResponse, deletePlace_1.default);
        userRouter.post("/new", authorizeUser_1.authorizeUserWithoutResponse, /*Add joi validation schema*/ newPlace_1.default);
        this.userRouter = userRouter;
    }
    get getRouter() {
        return this.userRouter;
    }
}
exports.default = PlaceController;
