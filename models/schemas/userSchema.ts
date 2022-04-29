import { Schema } from "mongoose";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    lugares: [
        {type: Schema.Types.ObjectId, ref: "Place"}
    ],
    comentarios: [
        {type: Schema.Types.ObjectId, ref: "Comment"}
    ]
});
export default userSchema