import { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import express from "express";
import {
  scriptSrcUrls,
  styleSrcUrls,
  connectSrcUrls,
  fontSrcUrls,
} from "./helmetUrls";

export default class GeneralMiddleware {
  app: Express;
  constructor(app: Express) {
    this.app = app;
    this.callMongoose();
    this.callGeneralMiddleware();
  }
  private callMongoose() {
    mongoose.connect(process.env.DB as string)
    const db = mongoose.connection;
        db.on("error", () => {
          console.error.bind(console, "connection error");
        });
        db.once("open", () => {
          console.log("Database connected");
        });
  }
  private callGeneralMiddleware () {
              //cors
              this.app.use(cors({origin: true})); // Put a cors config. {origin: "the hostname we want to allow requests to come from"}
              // Urlencoded for requests in body     // or even: origin: () => void
              this.app.use(express.urlencoded({extended: true}));
              // Json parser
              this.app.use(express.json());
              // Static serving
              this.app.use(express.static("public"));
              // Mongo querys sanitizer
              this.app.use(ExpressMongoSanitize({allowDots: true}));
              // Helmet
              this.app.use(helmet.contentSecurityPolicy({
                  useDefaults: false,
                  directives: {
                      defaultSrc: [],
                      connectSrc: ["'self'", ...connectSrcUrls],
                      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
                      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
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
                      fontSrc: ["'self'", ...fontSrcUrls]
                  },
              }));
  }
}
