"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    cuerpo: {
        type: String,
        required: [true, "No puede estar en blanco"]
    },
    rating: {
        type: Number,
        required: [true, "Se requiere un puntaje"]
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    lugar: {
        type: mongoose_1.Schema.Types.ObjectId, ref: "Place"
    }
});
exports.default = commentSchema;
