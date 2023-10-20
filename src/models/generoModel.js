import mongoose from "mongoose";
import {cancionSchema} from "./cancionModel.js";

const generoSchema = new mongoose.Schema({
    genero: String,
    canciones: [cancionSchema]
});
export const Genero = mongoose.model("Genero", generoSchema);
