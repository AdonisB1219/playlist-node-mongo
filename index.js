import express from "express";
import {MongoClient} from "mongodb";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
const port = 3000;
mongoose.connect("mongodb://127.0.0.1:27017/playlists");
const client = new MongoClient("mongodb://127.0.0.1:27017");

async function start(){

    await client.connect();
    const db = client.db("playlists")

    app.get("/api/generos", async (req, res) =>{
        const generos = await db.collection('generos').find().toArray();
        res.send(generos);
    });
    //TODO get generos

    app.get("/api/generos/:genero", async (req, res) =>{
        const genero = await db.collection('generos').find({genero: req.params.genero}).toArray();
        res.send(genero);
    })
    //TODO get un género

    app.post("/api/generos", async (req, res)=>{
        const genero = req.body.genero;
        console.log(genero)
        await db.collection('generos').insertOne({genero: genero, canciones: req.body.canciones});
        res.json(await db.collection('generos').find().toArray());
    });
    //TODO post generos

    app.put("/api/generos/:genero", async (req, res)=>{
        const generoAnt = req.params.genero;
        const generoNuevo = req.body.genero;
        let anterior = await db.collection('generos').updateOne({genero: generoAnt}, {$set: {genero: generoNuevo}});
        res.json(await db.collection('generos').find().toArray());
    })

    //Post canciones
    app.post("/api/generos/:genero/canciones", async (req, res)=>{
        const generoStr = req.params.genero;
        let anterior = await db.collection('generos').updateOne({genero: generoStr}, {$push: {canciones: req.body.canciones}});
        res.json(await db.collection('generos').find().toArray());
    })
    //TODO put generos

    app.delete("/api/generos/:genero", async (req, res)=>{
        const genero = req.params.genero;
        await db.collection('generos').deleteOne({genero: genero});
    })

    //TODO delete generos
    






    //app.get("/api/generos/canciones")

    app.listen(port, ()=>{
        console.log(`Iniciado en puerto ${port}`)
    });
}

start();

