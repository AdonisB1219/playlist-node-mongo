import express from "express";
import mongoose from "mongoose";
import { Genero } from "./src/models/generoModel.js"
import { Cancion } from "./src/models/cancionModel.js"


const app = express();
app.use(express.json());
const port = 3000;
mongoose.connect("mongodb://127.0.0.1:27017/playlist-multi-schema", { useNewUrlParser: true });

app.get("/api/generos", async (req, res) => {
    res.send(await Genero.find());
});

app.get("/api/generos/:genero", async (req, res) => {
    res.send(await Genero.find({genero: req.params.genero}));
})

app.post("/api/generos", async (req, res) => {
    const genero = new Genero(req.body);
    try{
        await genero.save()
        res.status(201).json({ mensaje: 'Género agregado con éxito' });
    } catch (error){
        console.error(error);
        res.status(500).json({ mensaje: 'Error al agregar el género' });
    }
    
});


app.put("/api/generos/:genero", async (req, res) => {
    await Genero.updateOne({genero: req.params.genero}, {genero: req.body.genero});
    res.send(await Genero.find({genero: req.body.genero}));

})


app.post("/api/generos/:genero", async (req, res) => {
    const cancionNueva = await Cancion.find({nombre: req.body.nombre});
    console.log(cancionNueva);
    await Genero.updateOne({genero: req.params.genero}, {$push:{canciones: cancionNueva}});

    res.send(await Genero.find({genero: req.params.genero}));
})


app.post("/api/canciones", async (req, res) => {
    const cancion = new Cancion(req.body);
    try {
        await cancion.save();
        res.status(201).json({ mensaje: 'Cancion agregada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al agregar la canción' });
    }
})

app.delete("/api/generos/:genero/canciones", async (req, res) => {
    await Genero.updateOne({genero: req.params.genero}, {$pull: {nombre: req.body.nombre}});
    res.send(await Genero.find());
})

//TODO delete generos


app.listen(port, () => {
    console.log(`Iniciado en puerto ${port}`)
});


