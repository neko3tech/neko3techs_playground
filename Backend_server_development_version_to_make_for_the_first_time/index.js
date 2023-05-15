const express = require("express");
const app = express();

// root
app.get("/", (req, res) => {
    res.send("こんにちは")
});


// Listening start.
app.listen(5000, () => {
    console.log("Listening on localhost:5000");
});
