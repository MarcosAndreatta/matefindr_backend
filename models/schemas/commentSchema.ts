import { Schema } from "mongoose";
const commentSchema = new Schema({
    cuerpo: {
        type: String,
        required: [true, "No puede estar en blanco"]
    },
    rating: {
        type: Number,
        required: [true, "Se requiere un puntaje"]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    lugar: {
        type: Schema.Types.ObjectId, ref: "Place"
    }
});
export default commentSchema