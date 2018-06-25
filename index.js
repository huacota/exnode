const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const app = express();
const ObjectID=require(`mongodb`).ObjectID; // criação da const p importação do id -> object

app.use(expressMongoDb('mongodb://localhost/exnode'));
app.use(bodyParser.json());

app.get('/exnode', (req, res) => {
    req.db.collection('sabores').find().toArray((err, data) => {
        if(err){
            res.status(500).send('Erro ao acessar o banco de dados');
            return;
        }       
        res.send(data);
    });     
});

app.get('/exnode/:id', (req, res) => {
    let query = {
        _id: ObjectID(req.params.id)
    };

    req.db.collection('sabores').findOne(query, (err, data) => {
        if(err){
            res.status(500).send(`Erro ao acessar o banco de dados`);
            return;
        }

        if(!data){
            res.status(404).send(`Não encontrado`);
            return;
        }

        res.send(data);
    });
});


app.post('/exnode', (req, res) => {
    req.db.collection('sabores').insert(req.body, (err) => {
        if(err){
            res.status(500).send('Erro ao acessar o banco de dados');
            return;
        }
        res.send(req.body);
    });     
});

app.listen(3000);