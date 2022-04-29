"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lugar = exports.Comentario = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//import mongooseUniqueValidator from "mongoose-unique-validator";
const mongoose_2 = require("mongoose");
const lugarSchema = new mongoose_2.Schema({
    nombre: {
        type: String,
        required: [true, "Se requiere un nombre"]
    },
    author: {
        type: mongoose_2.Schema.Types.ObjectId,
        required: [true, "Debe ingresarse un nombre"],
        ref: "User"
    },
    comentarios: [{
            type: mongoose_2.Schema.Types.ObjectId,
            ref: "Comentario"
        }],
    ubicacion: {
        type: [Number],
        required: [true, "Se requieren coordenadas"]
    }
});
const UserSchema = new mongoose_2.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    lugares: [
        { type: mongoose_2.Schema.Types.ObjectId, ref: "Lugar" }
    ],
    comentarios: [
        { type: mongoose_2.Schema.Types.ObjectId, ref: "Comentario" }
    ]
});
const comentarioSchema = new mongoose_2.Schema({
    cuerpo: {
        type: String,
        required: [true, "No puede estar en blanco"]
    },
    rating: {
        type: Number,
        required: [true, "Se requiere un puntaje"]
    },
    author: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User"
    },
    lugar: {
        type: mongoose_2.Schema.Types.ObjectId, ref: "Lugar"
    }
});
//UserSchema.plugin(mongooseUniqueValidator);
exports.User = mongoose_1.default.model("User", UserSchema);
exports.Comentario = mongoose_1.default.model("Comentario", comentarioSchema);
exports.Lugar = mongoose_1.default.model("Lugar", lugarSchema);
