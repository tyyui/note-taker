//dependecies
const express = require ('express')
const path = require('path')
const fs = require('fs')

let data = [];

//initialize express
const app = express();
const PORT = process.env.PORT || 3000;

//data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Develop/public')));

//GET
app.get('/:endpoint?', function(req, res){
    switch (req.params.endpoint) {            
        case 'notes':
            res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
            break;
        default: 
            res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
            break;
    }
});

app.get('/api/notes', function (err, res) {
    try {
        data = fs.readFileSync('Develop/db/db.json','utf8');
        data = JSON.parse(data);
        res.json(data);
    }
    catch (err) {
        throw err;
        console.log(err);
    }
});

//post
app.post('/api/notes', function(req, res){
    try{
        data = fs.readFileSync('Develop/db/db.json', 'utf-8');
        data =  JSON.parse(data);
        req.body.id = data.length;
        data.push(req.body);
        data = JSON.stringify(data);
        fs.writeFileSync('Develop/db/db.json', data, 'utf-8');
        res.json(JSON.parse(data));
        console.log('Your note has been saved!');
    }
    catch (err){
        throw err;
        console.log(err);
    }
});

//post
app.post('/api/notes', function(req, res){
    try{
        data = fs.readFileSync('Develop/db/db.json', 'utf-8');
        data =  JSON.parse(data);
        console.log(data);
        req.body.id = data.length;
        data.push(req.body);
        data = JSON.stringify(data);
        fs.writeFileSync('Develop/db/db.json', data, 'utf-8');
        res.json(JSON.parse(data));
        console.log('Your note has been saved!');
    }
    catch (err){
        throw err;
        console.log(err);
    }
});

app.delete('/api/notes/:id?', function(req, res){
    try{
        let x = req.params.id;
        console.log(x);
        data = fs.readFileSync('Develop/db/db.json', 'utf-8');
        data = JSON.parse(data);
        console.log(data);
        data = data.filter(data => {return data.id.toString() !== x});
        console.log(data);
        data = JSON.stringify(data);
        fs.writeFileSync('Develop/db/db.json', data, 'utf-8');
        res.json(JSON.parse(data));
        console.log('Your note has been deleted!');
    }
    catch (err){
        throw err;
        console.log(err);
    }
});


app.listen(PORT, function(){
    console.log('listening to port '+ PORT);
});