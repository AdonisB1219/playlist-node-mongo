import mongoose from "mongoose";

const generoSchema = new Schema({
    genero: String,
    canciones: [cancionSchema]
});
const Genero = mongoose.model("Genero", generoSchema);

export const genero = Genero;