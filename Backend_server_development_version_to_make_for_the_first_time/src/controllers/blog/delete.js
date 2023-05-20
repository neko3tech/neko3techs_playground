const path = require("path");
const BlogModel = require(path.join(__dirname, "../../models/blog"));

module.exports = {
    /** Article delete page */
    get: async (req, res) => {
        try {
            const singleBlog = await BlogModel.get(req.params.id);
            res.render("blogDelete", { singleBlog });

        } catch (error) {
            console.error("個別ブログデータの読み取りが失敗しました。", error);
            res.render("errorPage", { req, error });
        }
    },
    /** Article delete */
    post: async (req, res) => {
        try {
            const singleBlog = await BlogModel.delete(req.params.id);
            res.redirect("/");

        } catch (error) {
            console.error("ブログデータの削除が失敗しました。", error);
            res.render("errorPage", { req, error });
        }
    }
};