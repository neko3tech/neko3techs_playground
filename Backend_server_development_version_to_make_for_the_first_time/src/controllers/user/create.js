const path = require("path");
const UserModel = require(path.join(__dirname, "../../models/user"));

module.exports = {
    /** Create user page */
    get: {
        path: "/user/create",
        fn: (req, res) => {
            res.render("userCreate");
        }
    },
    /** reate user */
    post: {
        path: "/user/create",
        fn: async (req, res) => {
            try {
                const userData = await UserModel.add(req.body);
                res.redirect("/user/login");

            } catch (error) {
                console.error("ユーザーデータ登録が失敗しました。", error);
                res.render("errorPage", { req, error });
            }
        }
    }
};