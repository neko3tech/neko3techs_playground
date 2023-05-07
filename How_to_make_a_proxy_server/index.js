const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware")

app.get("/", (req, res) => {
    res.send("This is my proxy servers.");
});

app.use("/corona-tracker-world-data", (req, res, next) => {
    createProxyMiddleware({
        target: "https://monotein-books.vercel.app/api/corona-tracker/summary",
        changeOrigin: true,
        pathRewrite: {
            [`^/corona-tracker-world-data`]: "",
        },
    })(req, res, next)
});

app.listen(5000, () => {
    console.log("Listening on localhost:5000");
});