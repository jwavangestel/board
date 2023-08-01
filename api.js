const client = require('./connection.js')
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require('cors');

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });


app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})

client.connect();

app.get('/status', (req, res)=>{
    client.query(`Select description, omschrijving from status, taken where status.sc_id = taken.sc_id`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


app.get('/taken', (req, res)=>{
    client.query(`Select * from taken`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/books', (req, res)=>{
    client.query(`Select id, title from books`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/taak/:id', (req, res)=> {
    console.log(req);
    client.query(`Select * from taken where task_id=${req.params.id}`, (err, result)=> {
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


app.get('/board', (req, res)=> {
    client.query(`Select * from board`, (err, result)=> {
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


app.post('/addTaak', (req, res) => {
    
    console.log('beer');
    console.log(req.query.sc_id + ' ' + req.query.titel +' hoen')

    let insertQuery = `INSERT INTO taken(sc_id, titel) VALUES(${req.query.sc_id}, '${req.query.titel}')`

    console.log(insertQuery)

    client.query(insertQuery, (err, result) => {
        if(!err) {
            res.send('Insertion was successfull')
        }
        else{ console.log(err.message)}
    })
    client.end
})