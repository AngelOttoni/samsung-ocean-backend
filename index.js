const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

(async () => {
// Conectar com o DB
// Pegar a minha collection

const url = "mongodb+srv://amo14:fenixwitch23@cluster0.u2t7q.mongodb.net/";
const dbName = "ocean_db_heroes";

console.info("Conectando ao banco de dados MongoDB...");

const client = await MongoClient.connect(url);

console.info("MongoDB conectado com sucesso!");

const db = client.db(dbName);
const collection = db.collection("heroes");

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

// Função de findById

async function findById(id) {
    const item = await collection.findOne({ _id: ObjectId(id) });

    return item;
}

// Endpoint de Read All

app.get("/herois", async function(req, res) {
    const resultado = await collection.find().toArray();

    res.send(resultado);
});

// Endpoint de Read Single (by Id)

app.get("/herois/:id", async function(req, res) {

    const id = req.params.id;

    const item = await findById(id);

        if (!item) {
        res.status(404).send("Item não encontrado!");

        // Return encerra a função
        return;
    }

    res.send(item);
});

// Endpoint de Create

app.post("/herois", async function (req, res) {

    const item = req.body;

    if (!item || !item.name) {
        res.status(400).send(
            "Corpo da requisição não encontrado ou está faltando a chave 'name'."
        );
        return;
    };
    
    await collection.insertOne(item);

    res.status(201).send(item);
});

// Endpoint de Update

app.put("/herois/:id", async function(req, res) {

    const id = req.params.id;
    
    const itemAtual = await findById(id);

    if (!itemAtual) {
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

    await collection.updateOne({ _id: ObjectId(id) }, { $set: item })

    res.send(item);

});

// Endpoint Delete

app.delete("/herois/:id", async function (req, res) {

    const id = req.params.id;

    const item = await findById(id);

    if (!item) {
        res.status(404).send("Item não encontrado!");

        return;
    };

    await collection.deleteOne({ _id: ObjectId(id) });

    res.send("Item removido com sucesso!");
});

app.listen(process.env.PORT || 3000);

})();