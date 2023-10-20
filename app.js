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

app.get("/api/canciones", async(req,res)=>{
    res.send(await Cancion.find());
})

app.post("/api/generos", async (req, res) => {
    const genero = new Genero(req.body);
    try{
        let agregado = await genero.save()
        res.status(201).json(agregado);
    } catch (error){
        console.error(error);
        res.status(500).json({ mensaje: 'Error al agregar el género' });
    }
    
});


app.put("/api/generos/:generoAnterior", async (req, res) => {
    await Genero.updateOne({genero: req.params.generoAnterior}, {genero: req.body.nuevoGenero});
    res.send(await Genero.find({genero: req.body.generoNuevo}));

})

app.put("/api/canciones/:cancion", async (req, res) => {
    let nombre = req.params.cancion;
    if (req.body.artista != null) await Cancion.updateOne({nombre: req.params.cancion}, {artista: req.body.artista});
    if (req.body.album != null) await Cancion.updateOne({nombre: req.params.cancion}, {album: req.body.album});
    if (req.body.rating != null) await Cancion.updateOne({nombre: req.params.cancion}, {rating: req.body.rating});
    if (req.body.nombre != null) {
        nombre = await Cancion.updateOne({nombre: req.params.cancion}, {artista: req.body.nombre});
    }
    res.send(await Cancion.find({nombre: nombre}));

});


app.post("/api/generos/:genero", async (req, res) => {
    const cancionNueva = await Cancion.find({nombre: req.body.nombre});
    console.log(cancionNueva);
    await Genero.updateOne({genero: req.params.genero}, {$push:{canciones: cancionNueva}});

    res.send(await Genero.find({genero: req.params.genero}));
})


app.post("/api/canciones", async (req, res) => {
    const cancion = new Cancion(req.body);
    try {
        let agregada = await cancion.save();
        res.status(201).json(agregada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al agregar la canción' });
    }
})

app.delete("/api/generos/:genero/canciones", async (req, res) => {
    await Genero.updateOne({genero: req.params.genero}, {$pull: {canciones: {nombre: req.body.nombre}}});
    res.send(await Genero.find({genero: req.params.genero}));
})

app.delete("/api/generos/:genero", async(req,res)=>{
    let borrado = await Genero.findOneAndDelete({genero: req.params.genero});;
    res.send(borrado);
})


app.listen(port, () => {
    console.log(`Iniciado en puerto ${port}`)
});


