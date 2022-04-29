import {Request, Response, NextFunction} from "express";
import { User } from "../../models";
import { AppError } from "../../server/AppError";
import bcrypt from "bcrypt";
import { ExpressTypes } from "../../types";
function registerUser (req: Request, res: Response, next: NextFunction) {
    const createUser = async () => {
        try {
            const user = new User({
              username: req.body.username,
              password: bcrypt.hashSync(req.body.password, 8),
            });
            const userCreated = await user.save();
            const response: ExpressTypes.response = {
              message: `Thanks for joining MateFindr, ${userCreated.username}. You can now log in`,
              action: "setIsOk",
            };
            res.status(201).json(response)
          } catch (error: any) {
            next(
              new AppError(500, `Error trying to register: ${error.message}`, "setIsError")
            );
          }
    };
    if (req.body.password === "") {return next(new AppError(500, "The password field cannot be blank", "setIsError"))}
    else {
        User.find({ username: req.body.username }, null, null, (error, result) => {
            if (error) {
              return next(new AppError(500, "Error reaching the database", "setIsError"));
            }
            else if (result.length === 0) {
              createUser();
            } else {
              next(new AppError(500, "An user has already registered using that username :(", "setIsError"));
            }
          });
    }
};
export default registerUser