const express = require("express");
const app = express();
const fs = require("fs");

// expressのURLエンコードを有効にする
app.use(express.urlencoded({ extended: true }));


// root
app.get("/", (req, res) => {
    res.sendfile(__dirname + "/index.html");
});


// autumn
app.post("/autumn", (req, res) => {
    fs.writeFile(__dirname + "/data.txt", req.body.activity, () => {
        res.send("投稿完了");
    });
});


// Listening start.
app.listen(5000, () => {
    console.log("Listening on localhost:5000");
});
