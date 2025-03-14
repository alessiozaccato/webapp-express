//pacchetti da importare
import express from "express";

//impostiamo express e la porta del server
const app = express();
const port = process.env.SERVER_PORT || 3000;

//attivazione del server
app.listen(port, () => {
    console.log(`Server Movies in funzione sulla porta: ${port}`)
});