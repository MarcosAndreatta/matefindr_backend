"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Place = exports.Comment = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema_1 = __importDefault(require("./schemas/userSchema"));
const placeSchema_1 = __importDefault(require("./schemas/placeSchema"));
const commentSchema_1 = __importDefault(require("./schemas/commentSchema"));
//UserSchema.plugin(mongooseUniqueValidator);
exports.User = mongoose_1.default.model("User", userSchema_1.default);
exports.Comment = mongoose_1.default.model("Comment", commentSchema_1.default);
exports.Place = mongoose_1.default.model("Place", placeSchema_1.default);
