const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();
const rootDir = __dirname;
const views = `${rootDir}/views`;
const { MONGO_DB_CON_STR } = process.env;


// expressのURLエンコードを有効にする
app.use(express.urlencoded({ extended: true }));


// connect mongodb
(async () => {
    try {
        await mongoose.connect(MONGO_DB_CON_STR);
        console.log("Success: Connected to MongoDB.");
    } catch (error) {
        console.error("Failuer: Unconnected to MongoDB.", error)
    }
})();


// db schema setting
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    title: String,
    summary: String,
    image: String,
    textBody: String,
});
const BlogModel = mongoose.model("Blog", BlogSchema);


// get:root
app.get("/", async (req, res) => {
    try {
        const allBlogs = await BlogModel.find();
        console.log("全ブログデータの読み取りが成功しました。", allBlogs);
        res.send("全ブログデータの読み取りが成功しました。");

    } catch (error) {
        console.error("全ブログデータの読み取りが失敗しました。", error);
        res.send("全ブログデータの読み取りが失敗しました。");
    }
});


// get:blog/article
app.get("/blog/:id", async (req, res) => {
    try {
        const singleBlog = await BlogModel.findById(req.params.id);
        console.dir(singleBlog);
        res.send("個別ブログデータのページ");
    } catch (error) {
        console.error("個別ブログデータの読み取りが失敗しました。", error);
        res.send("個別ブログデータの読み取りが失敗しました。");
    }

});
// get:blog/create
app.get("/blog/create", (req, res) => {
    res.sendFile(`${views}/blogCreate.html`);
});


// post:/blog/create
app.post("/blog/create", async (req, res) => {
    try {
        let data = await BlogModel.create(req.body);
        console.log("データの書き込みが成功しました。", data);
        res.send("ブログデータの投稿が成功しました。");
    } catch (error) {
        console.error("データの書き込みが失敗しました。", error);
        res.send("ブログデータの投稿が失敗しました。");
    }
});

// Listening start.
app.listen(5000, () => {
    console.log("Listening on localhost:5000");
});