const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.sendfile(__dirname + "/index.html");
});

app.listen(5000, () => {
    console.log("Listening on localhost:5000");
});