import {Request, Response, NextFunction} from "express";
import { Types } from "mongoose";

namespace ExpressTypes {
    export type ExpressHandlerFunction = (req: Request, res: Response, next: NextFunction) => void | any
    export type coordinates = [number, number];
    export type setter = "setIsError" | "setIsLogged" | "setIsAutorizado" | "setIsOk"    
    export interface response {
        message?: string;
        action: setter;
        additionalInfo?: any;
      }
      export interface placeResponse extends response {
        lugar?: lugar
      }
      export interface userResponse extends response {
        user?: {
          username: string;
          accessToken: string;
          _id: unknown
        };
      }
}
namespace ModelsTypes {
    export interface user {
        _id: Types.ObjectId;
        username: string;
        password: string;
        lugares: Types.ObjectId[];
        comentarios: Types.ObjectId[]
    }
    export interface place {
        _id: Types.ObjectId;
        nombre: string;
        author: user["_id"];
        comentarios: Types.ObjectId[];
        ubicacion: coordinates;   
    }
    export interface comment {
        _id: Types.ObjectId;
        cuerpo: string;
        rating: number;
        author: Types.ObjectId;
        lugar: Types.ObjectId;
      }
}
