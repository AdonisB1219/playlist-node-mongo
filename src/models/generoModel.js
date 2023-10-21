import mongoose from "mongoose";
import {cancionSchema} from "./cancionModel.js";

const generoSchema = new mongoose.Schema({
    genero: {
        type: String,
        unique: true,
        minlength: 3
    },
    canciones: [cancionSchema]
});
export const Genero = mongoose.model("Genero", generoSchema);
