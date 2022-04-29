"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const helmetUrls_1 = require("./helmetUrls");
class GeneralMiddleware {
    constructor(app) {
        this.app = app;
        this.callMongoose();
        this.callGeneralMiddleware();
    }
    callMongoose() {
        mongoose_1.default.connect(process.env.DB);
        const db = mongoose_1.default.connection;
        db.on("error", () => {
            console.error.bind(console, "connection error");
        });
        db.once("open", () => {
            console.log("Database connected");
        });
    }
    callGeneralMiddleware() {
        //cors
        this.app.use((0, cors_1.default)({ origin: true })); // Put a cors config. {origin: "the hostname we want to allow requests to come from"}
        // Urlencoded for requests in body     // or even: origin: () => void
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Json parser
        this.app.use(express_1.default.json());
        // Static serving
        this.app.use(express_1.default.static("public"));
        // Mongo querys sanitizer
        this.app.use((0, express_mongo_sanitize_1.default)({ allowDots: true }));
        // Helmet
        this.app.use(helmet_1.default.contentSecurityPolicy({
            useDefaults: false,
            directives: {
                defaultSrc: [],
                connectSrc: ["'self'", ...helmetUrls_1.connectSrcUrls],
                scriptSrc: ["'unsafe-inline'", "'self'", ...helmetUrls_1.scriptSrcUrls],
                styleSrc: ["'self'", "'unsafe-inline'", ...helmetUrls_1.styleSrcUrls],
                workerSrc: ["'self'", "blob:"],
                objectSrc: [],
                imgSrc: [
                    "'self'",
                    "blob:",
                    "data:",
                    "https://res.cloudinary.com/reyxeneise/",
                    "https://images.unsplash.com/",
                    "http://www.healthylivinghub.net/",
                ],
                fontSrc: ["'self'", ...helmetUrls_1.fontSrcUrls]
            },
        }));
    }
}
exports.default = GeneralMiddleware;
