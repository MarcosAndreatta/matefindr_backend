import ExpressServer from "./server/index";
import UserController from "./controllers/user";
import PlaceController from "./controllers/place";
import CommentController from "./controllers/comment";

const expressServer = new ExpressServer();
const userController = new UserController();
const placeController = new PlaceController();
const commentController = new CommentController();

expressServer.setRouter(userController.getRouter, "/users");
expressServer.setRouter(placeController.getRouter, "/places");
expressServer.setRouter(commentController.getRouter, "/comments");

expressServer.useErrorHandler()