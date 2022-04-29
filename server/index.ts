import "dotenv/config";

//Express stuff
import express, { Router } from "express";
import {Express, Request, Response, NextFunction} from "express";
//

//
import GeneralMiddleware from "./GeneralMiddleware";
import {errorMiddleware} from "./AppError";
// Maybe use getters and setters or methods as "endpoints"

class ExpressServer {
    private port: number;
    private app: Express;
    constructor(port = 8080) {
        this.port = process.env.PORT ? parseInt(process.env.PORT) : port
        this.app = express();
        this.listen();
        new GeneralMiddleware(this.app);
    }
    private listen () {
        this.app.listen(this.port, () => {console.log("Server started at", this.port, " port")});
    }
    public setRouter (router: Router, endpoint: string) {
        this.app.use(endpoint, router);
    }
    public useErrorHandler() {
        this.app.use(errorMiddleware)
    }
}
export default ExpressServer