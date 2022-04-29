"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
//Express stuff
const express_1 = __importDefault(require("express"));
//
//
const GeneralMiddleware_1 = __importDefault(require("./GeneralMiddleware"));
const AppError_1 = require("./AppError");
// Maybe use getters and setters or methods as "endpoints"
class ExpressServer {
    constructor(port = 8080) {
        this.port = process.env.PORT ? parseInt(process.env.PORT) : port;
        this.app = (0, express_1.default)();
        this.listen();
        new GeneralMiddleware_1.default(this.app);
    }
    listen() {
        this.app.listen(this.port, () => { console.log("Server started at", this.port, " port"); });
    }
    setRouter(router, endpoint) {
        this.app.use(endpoint, router);
    }
    useErrorHandler() {
        this.app.use(AppError_1.errorMiddleware);
    }
}
exports.default = ExpressServer;
