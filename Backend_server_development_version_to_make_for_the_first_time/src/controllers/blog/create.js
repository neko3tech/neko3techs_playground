const fs = require("fs");
const path = require("path");
const moment = require("moment");
const enc = require(path.join(__dirname, "../../lib/encryption"))();
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
                // 添付ファイルをリネーム＆移動
                const attachmentPath = req.body.attachment.path;
                const newFileName = enc.md5(moment().format("YYYY/YYYYMMDDhhmmssSSS")) + path.extname(attachmentPath);
                fs.renameSync(attachmentPath, path.join(process.cwd(), "/public/images", newFileName));
                // ファイル名を登録
                req.body.image = newFileName;

                // DB登録
                const singleBlog = await BlogModel.post(req.body);
                res.redirect(`/blog/${singleBlog._id}`);

            } catch (error) {
                console.error("データの書き込みが失敗しました。", error);
                res.render("errorPage", { req, error });
            }
        }
    },
};