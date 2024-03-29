const path = require("path");
const BlogModel = require(path.join(__dirname, "../../models/blog"));

module.exports = {
    /** Article read page */
    get: {
        path: "/blog/:id",
        fn: async (req, res) => {
            try {
                const singleBlog = await BlogModel.get(req.params.id);
                res.render("blog/read", { singleBlog, session: req.session.userId });

            } catch (error) {
                console.error("ブログデータの読み取りが失敗しました。", error);
                res.render("errorPage", { req, error });
            }
        }
    }
};