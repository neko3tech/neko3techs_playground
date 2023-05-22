const path = require("path");
const BlogModel = require(path.join(__dirname, "../../models/blog"));

module.exports = {
    /** Article updade page */
    get: {
        path: "/blog/update/:id",
        fn: async (req, res) => {
            try {
                const singleBlog = await BlogModel.get(req.params.id);
                res.render("blogUpdate", { singleBlog, session: req.session.userId });

            } catch (error) {
                console.error("ブログデータの読み取りが失敗しました。", error);
                res.render("errorPage", { req, error });
            }
        }
    },
    /** Article update */
    post: {
        path: "/blog/update/:id",
        fn: async (req, res) => {
            try {
                const singleBlog = await BlogModel.edit(req.params.id, req.body);
                res.redirect(`/blog/${req.params.id}`);

            } catch (error) {
                console.error("ブログデータの編集が失敗しました。", error);
                res.render("errorPage", { req, error });
            }
        }
    }
};