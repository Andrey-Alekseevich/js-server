// Конфигурация сервера
const express = require('express');
const app = express();
const port = 4000;

// Конфигурация парсинга JSON
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Конфигурация базы данных
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Andrey:iaY09c9mCxITPfjt@tnotescluster.169dus2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

// Запуск базы данных
client.connect(err => {

    // Импортируем коллекцию из DataBase
    const collection = client.db("notesDB").collection("notes");

    // Создает слушатель
    app.listen(port, () => { console.log(`Server started on port ${port}`); });

    // GET метод
    app.get('/notes', (req, res) => {
        collection.find().toArray((err, data) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(data);
        });
    });

    // POST метод
    app.post('/notes', (req, res) => {
        let note = {
            note: req.body.note
        };
        collection.insertOne(note, (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(note);
        });
    });
});


