const path = require("path");
const UserModel = require(path.join(__dirname, "../../models/user"));

module.exports = {
    /** Login user page */
    get: {
        path: "/user/login",
        fn: (req, res) => {
            res.render("userLogin");
        }
    },
    /** Login user */
    post: {
        path: "/user/login",
        fn: async (req, res) => {
            try {
                const userData = await UserModel.get(req.body);

                if (userData && userData.password === req.body.password) {
                    req.session.userId = userData._id;
                    res.redirect("/");

                } else {
                    throw new Error("ログインに失敗しました。");
                }

            } catch (error) {
                console.error("ユーザーデータ取得が失敗しました。", error);
                res.render("errorPage", { req, error });
            }
        }
    }
};