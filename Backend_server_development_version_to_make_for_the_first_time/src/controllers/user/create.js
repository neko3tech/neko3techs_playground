const path = require("path");
const UserModel = require(path.join(__dirname, "../../models/user"));
const enc = require(path.join(__dirname, "../../lib/encryption"))();

module.exports = {
    /** Create user page */
    get: {
        path: "/user/create",
        fn: (req, res) => {
            res.render("user/create");
        }
    },
    /** reate user */
    post: {
        path: "/user/create",
        fn: async (req, res) => {
            try {
                // Replace with encrypted password
                req.body.password = enc.benc(req.body.password);
                const userData = await UserModel.add(req.body);
                res.redirect("/user/login");

            } catch (error) {
                console.error("ユーザーデータ登録が失敗しました。", error);
                res.render("errorPage", { req, error });
            }
        }
    }
};