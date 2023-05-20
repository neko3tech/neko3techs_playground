const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();
const rootDir = __dirname;
const { MONGO_DB_CON_STR, APP_PORT } = process.env;

//// application settings
// enable express URL encode
app.use(express.urlencoded({ extended: true }));

// enable expless session
app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 5 * 60 * 1000 },
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

//// db schema settings
const Schema = mongoose.Schema;
// blog schema setting
const BlogSchema = new Schema({
    title: String,
    summary: String,
    image: String,
    textBody: String,
});
// user schema setting
const userSchema = new Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
});
// create models
const BlogModel = mongoose.model("Blog", BlogSchema);
const UserModel = mongoose.model("User", userSchema);


//// Page rooting
// Top page : Read all blog
app.get("/", async (req, res) => {
    try {
        const allBlogs = await BlogModel.find();
        res.render("index", { allBlogs, session: req.session.userId });

    } catch (error) {
        console.error("全ブログデータの読み取りが失敗しました。", error);
        res.render("errorPage", { req, error });

    }
});


// Article create page
app.get("/blog/create", (req, res) => {
    if (req.session.userId) {
        res.render("blogCreate");

    } else {
        res.redirect("/user/login");
    }
});


// Article create : Create single blog
app.post("/blog/create", async (req, res) => {
    try {
        const singleBlog = await BlogModel.create(req.body);
        res.send({ "ブログデータの投稿が成功しました。": singleBlog });

    } catch (error) {
        console.error("データの書き込みが失敗しました。", error);
        res.render("errorPage", { req, error });
    }

});


// Article read page : Read single blog
app.get("/blog/:id", async (req, res) => {
    try {
        const singleBlog = await BlogModel.findById(req.params.id);
        res.render("blogRead", { singleBlog, session: req.session.userId });

    } catch (error) {
        console.error("個別ブログデータの読み取りが失敗しました。", error);
        res.render("errorPage", { req, error });
    }

});


// Article updade page : Read single blog
app.get("/blog/update/:id", async (req, res) => {
    try {
        const singleBlog = await BlogModel.findById(req.params.id);
        res.render("blogUpdate", { singleBlog, session: req.session.userId });

    } catch (error) {
        console.error("個別ブログデータの読み取りが失敗しました。", error);
        res.render("errorPage", { req, error });
    }

});


// Article update : Update single blog
app.post("/blog/update/:id", async (req, res) => {
    try {
        const singleBlog = await BlogModel.updateOne({ _id: req.params.id }, req.body).exec();
        res.redirect("/");

    } catch (error) {
        console.error("個別ブログデータの編集が失敗しました。", error);
        res.render("errorPage", { req, error });
    }

});


// Article delete page : Delete single blog
app.get("/blog/delete/:id", async (req, res) => {
    try {
        const singleBlog = await BlogModel.findById(req.params.id);
        res.render("blogDelete", { singleBlog });

    } catch (error) {
        console.error("個別ブログデータの読み取りが失敗しました。", error);
        res.render("errorPage", { req, error });
    }

});


// Article delete : Delete single blog
app.post("/blog/delete/:id", async (req, res) => {
    try {
        const singleBlog = await BlogModel.deleteOne({ _id: req.params.id }).exec();
        res.redirect("/");

    } catch (error) {
        console.error("個別ブログデータの削除が失敗しました。", error);
        res.render("errorPage", { req, error });
    }

});


// Create user page
app.get("/user/create", (req, res) => {
    res.render("userCreate");
});

// Create user : Create user
app.post("/user/create", async (req, res) => {
    try {
        console.dir(req.body);
        const userData = await UserModel.create(req.body);
        res.redirect("/user/login");

    } catch (error) {
        console.error("ユーザーデータ登録が失敗しました。", error);
        res.render("errorPage", { req, error });
    }
});


// Login user page
app.get("/user/login", (req, res) => {
    res.render("userLogin");
});


// Login user : Read user
app.post("/user/login", async (req, res) => {
    try {
        const userData = await UserModel.findOne({ email: req.body.email });

        if (userData && userData.password === req.body.password) {
            req.session.userId = userData._id;
            res.redirect("/");

        } else {
            throw new Error("ログインに失敗しました。");
        }

    } catch (error) {
        console.error("ユーザーデータ取得が失敗しました。", error);
        res.render("errorPage", { req, error });
    }
});


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
