import {Request, Response, NextFunction} from "express";
import { AppError } from "../../server/AppError";
import { User } from "../../models";
import jwt from "jsonwebtoken";
import { ExpressTypes, ModelsTypes } from "../../types";
export const authorizeUser = function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (!accessToken) {
      return next(new AppError(401, "There was not accessToken", "setIsError"));
    } else {
        jwt.verify(
            accessToken,
            process.env.SECRET as string,
            (error, result: any) => {
              if (error) {
                return next(
                  new AppError(403, "Try log in again :S", "setIsError")
                  //Because if an user stays in a page, and in the meanwhile the token get expired, I don't
                  //want the user to see the specific error is thwrowed, so I hide this.
                  // new AppError(
                  //   403,
                  //   `${error}`,
                  //   "setIsError"
                  // )
                );
              }
              if (!result) {
                return next(new AppError(500, "There was not result. Database error?"));
              }
              User.findById(result.id, (error: any, result: ModelsTypes.user) => {
                if (error) {
                  return next(
                    new AppError(403, "Error reaching the database to search for the user", "setIsError")
                  );
                }
                const response: ExpressTypes.userResponse = {
                  message: `Welcome back ${result.username}!`,
                  action: "setIsAutorizado",
                  user: {
                    username: result.username,
                    _id: result._id,
                    accessToken: accessToken as string, // revisar
                  },
                };
                res.status(201).json(response)
                next();
              });
            }
          );
    }
    
};

export const authorizeUserWithoutResponse = function (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (!accessToken) {
    return next(new AppError(401, "There was not accessToken", "setIsError"));
  } else {
      jwt.verify(
          accessToken,
          process.env.SECRET as string,
          (error, result: any) => {
            if (error) {
              return next(
                new AppError(403, "Try log in again :S", "setIsError")
                //Because if an user stays in a page, and in the meanwhile the token get expired, I don't
                //want the user to see the specific error is thwrowed, so I hide this.
                // new AppError(
                //   403,
                //   `${error}`,
                //   "setIsError"
                // )
              );
            }
            if (!result) {
              return next(new AppError(500, "There was not result. Database error?"));
            }
            User.findById(result.id, (error: any, result: ModelsTypes.user) => {
              if (error) {
                return next(
                  new AppError(403, "Error reaching the database to search for the user", "setIsError")
                );
              }
              next();
            });
          }
        );
  }
  
};
