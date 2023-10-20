import mongoose from "mongoose";

export const cancionSchema = new mongoose.Schema({
    nombre: String,
    artista: String,
    album: String,
    rating: Number
});

export const Cancion = mongoose.model("Cancion", cancionSchema);