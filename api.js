const client = require('./connection.js')
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require('cors');

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
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
    client.query(`Select * from status`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/kolompositie', (req, res)=>{
    client.query(`Select * from kolompositie`, (err, result)=>{
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

app.get('/taakpositie', (req, res)=>{
    client.query(`Select * from taakpositie`, (err, result)=>{
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


app.post('/addTaak', async (req, res) => {
    
    let insertQuery = `INSERT INTO taken(sc_id, titel) VALUES(${req.query.sc_id}, '${req.query.titel}')`

    console.log(insertQuery)

     await client.query(insertQuery, (err, result) => {
        if(!err) {
            res.send('Insertion was successfull')
       }
        else{ console.log(err.message)}
    })
//    client.end
})

app.put('/modifyTaak', async (req, res) => {
//    console.log("kuif")
//    console.log(req.query)

//    console.log( 'In put taak ' + req.query.taak_id + req.query.sc_id + req.query.titel + req.query.omschrijving)
    
   let updateQuery = `UPDATE taken SET titel = '${req.query.titel}', omschrijving = '${req.query.omschrijving}' 
   where task_id=${req.query.taak_id} `

//   console.log(updateQuery)

    await client.query(updateQuery, (err, result) => {
        if(!err) {
            
       }
        else{ console.log(err.message)}
   })
    client.end
})

app.put('/modifyTaakScId', async (req, res) => {
    //    console.log("kuif")
    //    console.log(req.query)
    
    //    console.log( 'In put taak ' + req.query.taak_id + req.query.sc_id + req.query.titel + req.query.omschrijving)
        
       let updateQuery = `UPDATE taken SET sc_id = '${req.query.sc_id}' 
       where task_id=${req.query.taak_id} `
    
    //   console.log(updateQuery)
    
        await client.query(updateQuery, (err, result) => {
            if(!err) {
                
           }
            else{ console.log(err.message)}
       })
        client.end
    })

app.put('/updateTaakPositie', async (req, res) => {
    console.log("kuif")
    console.log(req.query.positie)
    
    //    console.log( 'In put taak ' + req.query.taak_id + req.query.sc_id + req.query.titel + req.query.omschrijving)

       let i_pos = req.query.positie 
       let i_sc_id = req.query.sc_id
       let updateQuery = `UPDATE taakpositie SET positie = '${i_pos}' where sc_id= '${i_sc_id}'`
       console.log(updateQuery)    
    //   console.log(updateQuery)
    
       await  client.query(updateQuery, (err, result) => {
            if(!err) {
                
           }
            else{ console.log(err.message)}
       });
       client.query(`Select * from taakpositie`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
        client.end
    })
    
//UPDATE table_name
//SET column1 = value1, column2 = value2, ...
//WHERE condition; 

app.get('/board3', (req, res)=> {
    client.query(`Select * from board3`, (err, result)=> {
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/latestTaskId', async(req, res)=> {
    await client.query(`SELECT max(task_id) FROM public.taken`, (err, result)=> {
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})