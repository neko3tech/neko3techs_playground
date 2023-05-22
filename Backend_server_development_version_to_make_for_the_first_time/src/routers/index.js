const router = require("express").Router();
const path = require("path");
const controllers = require('require-all')(path.join(__dirname, "../controllers"));

// wWap router.get and router.post
const setRouter = {
    get: (path, fn) => {
        router.get(path, fn);
    },
    post: (path, fn) => {
        router.post(path, fn);
    }
};

// Register controllers recursively
const balkSetRouter = (controllers) => {
    for (const key in controllers) {
        if (key === "get" || key === "post") {
            setRouter[key](controllers[key].path, controllers[key].fn);
        } else {
            balkSetRouter(controllers[key]);
        }
    }
};
balkSetRouter(controllers);


module.exports = router;