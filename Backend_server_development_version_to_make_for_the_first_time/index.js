const express = require("express");
const app = express();
const rootDir = __dirname;
const views = `${rootDir}/views`;

// expressのURLエンコードを有効にする
app.use(express.urlencoded({ extended: true }));


// get:root
app.get("/", (req, res) => {
    res.send("こんにちは")
});

// get:blog/create
app.get("/blog/create", (req, res) => {
    res.sendFile(`${views}/blogCreate.html`);
});

// post:blog/create
app.post("/blog/create", (req, res) => {
    console.log(req.body)
    res.send("こんにちは");
});

// Listening start.
app.listen(5000, () => {
    console.log("Listening on localhost:5000");
});
