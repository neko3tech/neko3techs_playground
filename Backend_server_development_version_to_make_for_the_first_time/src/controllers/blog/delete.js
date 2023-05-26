const fs = require("fs");
const path = require("path");
const BlogModel = require(path.join(__dirname, "../../models/blog"));

module.exports = {
    /** Article delete page */
    get: {
        path: "/blog/delete/:id",
        fn: async (req, res) => {
            try {
                const singleBlog = await BlogModel.get(req.params.id);
                res.render("blog/delete", { singleBlog });

            } catch (error) {
                console.error("個別ブログデータの読み取りが失敗しました。", error);
                res.render("errorPage", { req, error });
            }
        }
    },
    /** Article delete */
    post: {
        path: "/blog/delete/:id",
        fn: async (req, res) => {
            try {
                // DB登録
                const singleBlog = await BlogModel.delete(req.params.id);

                // ファイル削除
                // 現在のファイルを削除
                fs.unlinkSync(path.join(process.cwd(), "/public/images", req.body.image));

                res.redirect("/");

            } catch (error) {
                console.error("ブログデータの削除が失敗しました。", error);
                res.render("errorPage", { req, error });
            }
        }
    }
};