import mongoose from "mongoose";

export const cancionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 2
    },
    artista: {
        type: String,
        required: true,
        minlength: 2
    },
    album: {
        type: String,
        required: true,
        minlength: 2
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
});

export const Cancion = mongoose.model("Cancion", cancionSchema);