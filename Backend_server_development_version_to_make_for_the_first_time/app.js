const express = require("express");
const session = require("express-session");
const formData = require('express-form-data');
const mongoose = require("mongoose");
require("dotenv").config();
const path = require('path');
const routers = require("./src/routers");

const app = express();
const { MONGO_DB_CON_STR, APP_PORT, APP_FILE_UPLOAD_DIR } = process.env;


//// application settings
// enable express URL encode
app.use(express.urlencoded({ extended: true }));

// enable expless session
app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
}));

// using public dir
app.use("/public", express.static("public"));

// file upload dir path
const uploadPath = path.join(__dirname, APP_FILE_UPLOAD_DIR);
// using formdata
app.use(formData.parse({ uploadDir: uploadPath, autoClean: true }));
// attach files mage body
app.use(formData.union());

// using router
app.use(routers);

// views dir
app.set('views', './src/views');
// ejs enable
app.set("view engine", "ejs");


// connect mongodb
(async () => {
    try {
        await mongoose.connect(MONGO_DB_CON_STR);
        console.log("Success: Connected to MongoDB.");

    } catch (error) {
        console.error("Failuer: Unconnected to MongoDB.", error)
    }
})();


// Page notfound
app.get("*", (req, res) => {
    const error = new Error("Page not found.");
    res.render("errorPage", { req, error });
});


// Listening start.
const port = APP_PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
});
