"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const placeSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "Se requiere un nombre"]
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Debe ingresarse un nombre"],
        ref: "User"
    },
    comentarios: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    ubicacion: {
        type: [Number],
        required: [true, "Se requieren coordenadas"]
    }
});
exports.default = placeSchema;
