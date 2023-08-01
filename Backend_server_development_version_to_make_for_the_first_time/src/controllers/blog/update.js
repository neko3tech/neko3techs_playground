const fs = require("fs");
const path = require("path");
const moment = require("moment");
const enc = require(path.join(__dirname, "../../lib/encryption"))();
const BlogModel = require(path.join(__dirname, "../../models/blog"));

module.exports = {
    /** Article updade page */
    get: {
        path: "/blog/update/:id",
        fn: async (req, res) => {
            try {
                const singleBlog = await BlogModel.get(req.params.id);
                res.render("blog/update", { singleBlog, session: req.session.userId });

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
                // ファイルが更新された場合
                if (req.body.attachment.size != 0) {
                    // 添付ファイルをリネーム＆移動
                    const attachmentPath = req.body.attachment.path;
                    const newFileName = enc.md5(moment().format("YYYY/YYYYMMDDhhmmssSSS")) + path.extname(attachmentPath);
                    fs.renameSync(attachmentPath, path.join(process.cwd(), "/public/images", newFileName));
                    // 新しいファイル名を登録
                    req.body.image = newFileName;
                    // 現在のファイルを削除
                    fs.unlinkSync(path.join(process.cwd(), "/public/images", req.body.currentImage));

                } else {
                    req.body.image = req.body.currentImage;
                }

                // DB登録
                const singleBlog = await BlogModel.edit(req.params.id, req.body);

                res.redirect(`/blog/${req.params.id}`);

            } catch (error) {
                console.error("ブログデータの編集が失敗しました。", error);
                res.render("errorPage", { req, error });
            }
        }
    }
};