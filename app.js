//pacchetti da importare
import express from "express";

//impostiamo express e la porta del server
const app = express();
const port = process.env.SERVER_PORT || 3000;

//importiamo il nostro router
import movieRouter from './routers/movieRouter.js'

//importiamo il middleware del path imagini
import imagePathMiddleware from './middlewares/imagePath.js'

//middleware per gestire path immagini
app.use(express.static('public'));

//middleware per gestire req body
app.use(express.json());

//middleware per gestione delle immagini
app.use(imagePathMiddleware);

//Router movies
app.use('/movies', movieRouter);

//attivazione del server
app.listen(port, () => {
    console.log(`Server Movies in funzione sulla porta: ${port}`)
});