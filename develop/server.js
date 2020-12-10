// Dependencies
// =============================================================
var express = require("express");
const fs = require('fs');
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static("public"));


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//needto read and save data from db.json 

//write routes for posting, reading
//home index page 
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    // res.sendFile(path.join(__dirname, "./db/db.json"));
    const data = fs.readFileSync("./db/db.json", "utf8", function (err) {
        console.log(err);
    })
    const notes = JSON.parse(data);
    res.json(notes);
});

// Create New note - save to file , return new note 
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    //newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newNote);
    let objectsString = fs.readFileSync("./db/db.json",function(err){
        console.log(err);
    });
    let currentData = JSON.parse(objectsString);
    currentData.push(req.body);
    for(let i=1; i<currentData.length;i++){
        currentData[i].id=i;
    }
    const writingString = JSON.stringify(currentData);
    fs.writeFileSync("./db/db.json",writingString);
    res.json(true);
  });

  app.delete("/api/notes/:id", function (req, res) {
    const noteId = req.params.id-1; //the id is one more than the actual index
    //the json file is read and parsed
    const jsonData = fs.readFileSync("./db/db.json");
    const obj = JSON.parse(jsonData);
    //the note with the id that is to be deleted is removed
    obj.splice(noteId, 1);
    //stringify and re-write the json file, the id's are reset
    let i=1;
    obj.forEach(function(element){
        element.id=i;
        i++;
    });
    const json = JSON.stringify(obj);
    fs.writeFileSync("./db/db.json", json);
    //send response
    res.json(true);
})

  
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
