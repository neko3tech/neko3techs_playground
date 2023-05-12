const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendfile(__dirname + "/index.html");
});

app.post("/autumn", (req, res) => {
    console.log("req.body : ", req.body);
});

app.listen(5000, () => {
    console.log("Listening on localhost:5000");
});