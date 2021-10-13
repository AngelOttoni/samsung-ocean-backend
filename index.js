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

const lista = [
    {
        id: 1,
        name: "Wonder Woman",
    }, 
    { 
        id: 2,
        name: "Catwoman",
    }, 
    {
        id: 3,
        name: "Supergirl",
    },
];

// Endpoint de Read All

app.get("/herois", function(req, res) {
    res.send(lista.filter(Boolean));
});

// Endpoint de Read Single (by Id)

app.get("/herois/:id", function(req, res) {

    const id = +req.params.id;

    const item = lista.find(item => item.id === id);

        if (!item) {
        res.status(404).send("Item não encontrado!");

        // Return encerra a função
        return;
    }

    res.send(item);
});

// Endpoint de Create

app.post("/herois", function(req, res) {

    const item = req.body;

    if (!item || !item.name) {
        res.status(400).send(
            "Corpo da requisição não encontrado ou está faltando a chave 'name'."
        );
        return;
    };

    lista.push(item.name);

    res.send(item.name + " adicionado(a) com sucesso!");
});

// Endpoint de Update

app.put("/herois/:id", function(req, res) {

    const id = +req.params.id - 1;

    if (!lista[id]) {
        res.status(404).send("Item não encontrado!");

        return;
    };

    const item = req.body;

    if (!item || !item.name) {
        res.status(400).send(
            "Corpo da requisição não encontrado ou está faltando a chave 'name'."
        );
        return;
    };

    lista[id] = item.name;

    res.send(item.name + " atualizado(a) com sucesso!");

});

// Endpoint Delete

app.delete("/herois/:id", function(req, res) {

    const id = +req.params.id - 1;

    if (!lista[id]) {
        res.status(404).send("Item não encontrado!");

        return;
    };

    delete lista[id];

    res.send("Item removido com sucesso!");
});

app.listen(3000);