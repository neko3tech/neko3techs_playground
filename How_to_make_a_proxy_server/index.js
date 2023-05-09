const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const url = require("url");

// Setting rateLimit.
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
});


// root
app.get("/", (req, res) => {
    res.send("This is my proxy server.");
});

// weather-data
app.use("/weather-data", limiter, (req, res, next) => {
    const city = url.parse(req.url).query;
    createProxyMiddleware({
        target: `${process.env.BASE_API_URL_WEATHERAPI}${city}`,
        changeOrigin: true,
        pathRewrite: {
            [`^/weather-data`]: "",
        },
    })(req, res, next)
});

// corona-tracker-country-data
app.use("/corona-tracker-country-data", limiter, (req, res, next) => {
    const city = url.parse(req.url).query;
    createProxyMiddleware({
        target: `${process.env.BASE_API_URL_CORONA_COUNTRY}/${city}`,
        changeOrigin: true,
        pathRewrite: {
            [`^/corona-tracker-country-data`]: "",
        },
    })(req, res, next)
});

// corona-tracker-world-data
app.use("/corona-tracker-world-data", limiter, (req, res, next) => {
    createProxyMiddleware({
        target: `${process.env.BASE_API_URL_CORONA_WORLD}`,
        changeOrigin: true,
        pathRewrite: {
            [`^/corona-tracker-world-data`]: "",
        },
    })(req, res, next)
});


// Listening start.
const port = process.env.PORT || 5000;
app.listen(5000, () => {
    console.log(`Listening on port:${port}`);
});


module.exports = app;