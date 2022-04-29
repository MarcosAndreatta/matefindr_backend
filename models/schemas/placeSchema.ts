
import { Schema } from "mongoose";


const placeSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "Se requiere un nombre"]
    },
    author: {
        type: Schema.Types.ObjectId,
        required: [true, "Debe ingresarse un nombre"],
        ref: "User"
    },
    comentarios: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    ubicacion: {
        type: [Number],
        required: [true, "Se requieren coordenadas"]
    }
});
export default placeSchema