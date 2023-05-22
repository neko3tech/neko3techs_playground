const path = require("path");
const BlogModel = require(path.join(__dirname, "../../models/blog"));

module.exports = {
    /** Article create page */
    get: {
        path: "/blog/create",
        fn: (req, res) => {
            if (req.session.userId) {
                res.render("blogCreate");

            } else {
                res.redirect("/user/login");
            }
        }
    },
    /** Article create */
    post: {
        path: "/blog/create",
        fn: async (req, res) => {
            try {
                const singleBlog = await BlogModel.post(req.body);
                res.redirect(`/blog/${singleBlog._id}`);

            } catch (error) {
                console.error("データの書き込みが失敗しました。", error);
                res.render("errorPage", { req, error });
            }
        }
    },
};