const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>見出し1</h1>");
});

app.listen(5000, () => {
    console.log("Listening on localhost:5000");
});