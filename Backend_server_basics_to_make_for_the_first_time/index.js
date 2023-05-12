const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendfile(__dirname + "/index.html");
});

app.post("/autumn", (req, res) => {
    fs.writeFile(__dirname + "/data.txt", req.body.activity, () => {
        res.send("投稿完了");
    });
});

app.listen(5000, () => {
    console.log("Listening on localhost:5000");
});