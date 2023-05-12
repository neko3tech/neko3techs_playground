const express = require("express");
const app = express();
const coronaData = require("./coronaData.json");

app.get("/", (req, res) => {
    res.send(coronaData);
});

app.listen(5000, () => {
    console.log("Listening on localhost:5000");
});