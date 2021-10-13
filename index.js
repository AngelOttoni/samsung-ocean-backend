const express = require("express");
const app = express();

app.use(express.json());

// Endpoints de 'Hello'

app.get("/", function(req, res) {
    res.send("Hello, World!");
});

app.get("/oi", function(req, res) {
    res.send("Olá, Mundo!");
});

// Lista de heróis

const lista = ["Wonder Woman", "Catwoman", "Supergirl"];

// Endpoint de Read All

app.get("/herois", function(req, res) {
    res.send(lista.filter(Boolean));
});

// Endpoint de Read Single (by Id)

app.get("/herois/:id", function(req, res) {

    const id = +req.params.id - 1;

    const item = lista[id];

    console.log(item);

    

    res.send(item);
});

// Endpoint de Create

app.post("/herois", function(req, res) {

    const item = req.body;

    lista.push(item.name);

    res.send(item.name + " adicionado(a) com sucesso!");
});

// Endpoint de Update

app.put("/herois/:id", function(req, res) {

    const id = +req.params.id - 1;

    const item = req.body;

    lista[id] = item.name;

    res.send(item.name + " atualizado(a) com sucesso!");

});

// Endpoint Delete

app.delete("/herois/:id", function(req, res) {

    const id = +req.params.id - 1;

    delete lista[id];

    res.send("Item removido com sucesso!");
});

app.listen(3000);