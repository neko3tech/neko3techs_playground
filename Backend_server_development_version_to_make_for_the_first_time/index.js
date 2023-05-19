const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();
const rootDir = __dirname;
const views = `${rootDir}/views`;
const { MONGO_DB_CON_STR } = process.env;

//// application settings
// enable express URL encode
app.use(express.urlencoded({ extended: true }));

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
        console.log("全ブログデータの読み取りが成功しました。", allBlogs);
        res.render("index", { allBlogs });

    } catch (error) {
        console.error("全ブログデータの読み取りが失敗しました。", error);
        res.send("全ブログデータの読み取りが失敗しました。");
    }
});


// Article create page
app.get("/blog/create", (req, res) => {
    res.render("blogCreate");
});


// Article create : Create single blog
app.post("/blog/create", async (req, res) => {
    try {
        const singleBlog = await BlogModel.create(req.body);
        console.log("データの書き込みが成功しました。", singleBlog);
        res.send({ "ブログデータの投稿が成功しました。": singleBlog });

    } catch (error) {
        console.error("データの書き込みが失敗しました。", error);
        res.send("ブログデータの投稿が失敗しました。");
    }

});


// Article read page : Read single blog
app.get("/blog/:id", async (req, res) => {
    try {
        const singleBlog = await BlogModel.findById(req.params.id);
        console.dir(singleBlog);
        res.render("blogRead", { singleBlog });

    } catch (error) {
        console.error("個別ブログデータの読み取りが失敗しました。", error);
        res.send("個別ブログデータの読み取りが失敗しました。");
    }

});


// Article updade page : Read single blog
app.get("/blog/update/:id", async (req, res) => {
    try {
        const singleBlog = await BlogModel.findById(req.params.id);
        console.dir(singleBlog);
        res.render("blogUpdate", { singleBlog });

    } catch (error) {
        console.error("個別ブログデータの読み取りが失敗しました。", error);
        res.send("個別ブログデータの読み取りが失敗しました。");
    }

});


// Article update : Update single blog
app.post("/blog/update/:id", async (req, res) => {
    try {
        const singleBlog = await BlogModel.updateOne({ _id: req.params.id }, req.body).exec();
        console.dir(singleBlog);
        res.send({ "個別ブログデータの編集が成功しました。": singleBlog });

    } catch (error) {
        console.error("個別ブログデータの編集が失敗しました。", error);
        res.send("個別ブログデータの編集が失敗しました。");
    }

});


// Article delete page : Delete single blog
app.get("/blog/delete/:id", async (req, res) => {
    try {
        const singleBlog = await BlogModel.findById(req.params.id);
        console.dir(singleBlog);
        res.render("blogDelete", { singleBlog });

    } catch (error) {
        console.error("個別ブログデータの読み取りが失敗しました。", error);
        res.send("個別ブログデータの読み取りが失敗しました。");
    }

});


// Article delete : Delete single blog
app.post("/blog/delete/:id", async (req, res) => {
    try {
        const singleBlog = await BlogModel.deleteOne({ _id: req.params.id }).exec();
        console.dir(singleBlog);
        res.send({ "個別ブログデータの削除が成功しました。": singleBlog });

    } catch (error) {
        console.error("個別ブログデータの削除が失敗しました。", error);
        res.send("個別ブログデータの削除が失敗しました。");
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
        console.log("ユーザーデータ登録が成功しました。", userData)
        res.send({ "ユーザーデータ登録が成功しました。": userData });

    } catch (error) {
        console.error("ユーザーデータ登録が失敗しました。", error);
        res.send({ "ユーザーデータ登録が失敗しました。": error });
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
        console.log("ユーザーデータ取得が成功しました。", userData);

        if (userData && userData.password === req.body.password) {
            res.send("ログインに成功しました。");
        } else {
            res.send("ログインに失敗しました。");
        }

    } catch (error) {
        console.error("ユーザーデータ取得が失敗しました。", error);
        res.send({ "ユーザーデータ取得が失敗しました。": error });
    }
});


// Listening start.
app.listen(5000, () => {
    console.log("Listening on localhost:5000");
});
