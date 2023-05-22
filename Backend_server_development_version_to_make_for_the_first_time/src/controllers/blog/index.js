const path = require("path");
const BlogModel = require(path.join(__dirname, "../../models/blog"));

module.exports = {
    /** Top page */
    get: {
        path: "/",
        fn: async (req, res) => {
            try {
                const allBlogs = await BlogModel.getAll();
                res.render("index", { allBlogs, session: req.session.userId });

            } catch (error) {
                console.error("全ブログデータの読み取りが失敗しました。", error);
                res.render("errorPage", { req, error });
            }
        }
    }
};