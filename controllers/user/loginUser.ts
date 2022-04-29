import {Request, Response, NextFunction} from "express";
import { AppError } from "../../server/AppError";
import { User } from "../../models";
import { ExpressTypes, ModelsTypes } from "../../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

function loginUser (req: Request, res: Response, next: NextFunction) {
    User.findOne(
        {username: req.body.username},
        (error: any, result: ModelsTypes.user) => {
            if (!result) {
                return next(
                  new AppError(500, "User not found. Try to log in again.", "setIsError")
                );
            } 
            if (error) {
                next(new AppError(500, "There was a mongoose error", "setIsError"));
            }
            const isValidPassword = bcrypt.compareSync(req.body.password, result.password);
            if (!isValidPassword) {
                return next(new AppError(404, "Log in failed. Check your credentials and try again", "setIsError"));
            }
            const accessToken = jwt.sign(
                { id: result._id },
                process.env.SECRET as string,
                { expiresIn: 360000 }
            );
            const response: ExpressTypes.userResponse =  {
                message: `We are glad to see you again, ${result.username}!`,
                action: "setIsLogged",
                user: {
                  username: result.username,
                  _id: result._id as unknown,
                  accessToken: accessToken,
                },
            };
            res.status(201).json(response);
        }
    );
};
export default loginUser