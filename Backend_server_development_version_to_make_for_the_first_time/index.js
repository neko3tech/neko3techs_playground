const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();
const { MONGO_DB_CON_STR, APP_PORT } = process.env;

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


//// Page rooting
// Top page : Read all blog
app.get("/", require(path.join(__dirname, "src/controllers/blog/index")).get);

// Article create page
app.get("/blog/create", require(path.join(__dirname, "src/controllers/blog/create")).get);

// Article create : Create single blog
app.post("/blog/create", require(path.join(__dirname, "src/controllers/blog/create")).post);


// Article read page : Read single blog
app.get("/blog/:id", require(path.join(__dirname, "src/controllers/blog/read")).get);

// Article updade page : Read single blog
app.get("/blog/update/:id", require(path.join(__dirname, "src/controllers/blog/update")).get);

// Article update : Update single blog
app.post("/blog/update/:id", require(path.join(__dirname, "src/controllers/blog/update")).post);


// Article delete page : Delete single blog
app.get("/blog/delete/:id", require(path.join(__dirname, "src/controllers/blog/delete")).get);

// Article delete : Delete single blog
app.post("/blog/delete/:id", require(path.join(__dirname, "src/controllers/blog/delete")).post);


// Create user page
app.get("/user/create", require(path.join(__dirname, "src/controllers/user/create")).get);

// Create user : Create user
app.post("/user/create", require(path.join(__dirname, "src/controllers/user/create")).post);

// Login user page
app.get("/user/login", require(path.join(__dirname, "src/controllers/user/login")).get);

// Login user : Read user
app.post("/user/login", require(path.join(__dirname, "src/controllers/user/login")).post);

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
