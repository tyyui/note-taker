  
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("App listening on PORT: " + PORT));

app.use(express.static("/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
})

app.get("/api/notes", (req, res) => {
    const noteList = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));

    res.json(noteList);
})

app.post("/api/notes", (req, res) => {
    const newNote = req.body;

    newNote.id = Math.floor(Math.random() * 100);
    console.log("success a note has been entered: " + JSON.stringify(newNote));


    const noteArray = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    noteArray.push(newNote);

    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteArray), "utf8");
    res.json(noteArray);
})
