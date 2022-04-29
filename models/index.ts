import mongoose from "mongoose";
import userSchema from "./schemas/userSchema";
import placeSchema from "./schemas/placeSchema";
import commentSchema from "./schemas/commentSchema";
import { ModelsTypes } from "../types";

//UserSchema.plugin(mongooseUniqueValidator);
export const User = mongoose.model<ModelsTypes.user>("User", userSchema);
export const Comment = mongoose.model<ModelsTypes.comment>("Comment", commentSchema)
export const Place = mongoose.model<ModelsTypes.place>("Place", placeSchema)