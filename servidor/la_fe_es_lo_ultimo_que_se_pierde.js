const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();

const AnimeModel = require("./modelos/Anime");

app.use(express.json());
app.use(cors())

/**
 * CONEXIÓN A LA BASE DE DATOS
 * ANTES USAR ESTO DEBE TENER CREAR UNA CONEXIÓN
 * CON MONGODB COMPASS mongodb+srv://PercyJ98:nf6y0RPYfhJCdiHw@cluster.inmd3.mongodb.net/test
 */

mongoose.connect(
    "mongodb+srv://PercyJ98:nf6y0RPYfhJCdiHw@cluster.inmd3.mongodb.net/prueba?retryWrites=true&w=majority",
    {
    useNewUrlParser: true
    }
);

app.get("/pruebainsertar", async (req, res) => {
    const anime = new AnimeModel({ title: "prueba1", score: 2 });

    try {
        await anime.save();
        res.send("inserted data");
    } catch(err){
        console.log(err);
    }
});

app.post("/insertar", async (req, res) => {
    const title = req.body.title;
    const score = req.body.score;

    
    const anime = new AnimeModel({ title: title, score: score });

    try {
        await anime.save();
        res.send("inserted data");
    } catch(err){
        console.log(err);
    }
});

app.get("/read", async (req, res) => {
    AnimeModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } 
        res.send(result);
    })
});

app.put("/actualizar", async (req, res) => {
    const newScore = req.body.newScore;
    const id = req.body.id;

    try {
        await AnimeModel.findById(id, (err, updatedScore)=> {
            updatedScore.score = newScore;
            updatedScore.save();
            res.send("update");
        });
    } catch(err){
        console.log(err);
    }
});

app.delete("/eliminar/:id", async (req, res)=> {
    const id = req.params.id;

    await AnimeModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});

app.listen(3001, () => {
    console.log("Conectado al puerto 3001");
});