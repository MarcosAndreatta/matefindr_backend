"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./server/index"));
const user_1 = __importDefault(require("./controllers/user"));
const place_1 = __importDefault(require("./controllers/place"));
const comment_1 = __importDefault(require("./controllers/comment"));
const expressServer = new index_1.default();
const userController = new user_1.default();
const placeController = new place_1.default();
const commentController = new comment_1.default();
expressServer.setRouter(userController.getRouter, "/users");
expressServer.setRouter(placeController.getRouter, "/places");
expressServer.setRouter(commentController.getRouter, "/comments");
expressServer.useErrorHandler();
