const router = require("express").Router();

const path = require("path");
const controllers = require('require-all')(path.join(__dirname, "../controllers"));

//// Page rooting
// Top page : Read all blog
router.get("/", controllers.blog.index.get);


// Article create page
router.get("/blog/create", controllers.blog.create.get);

// Article create : Create single blog
router.post("/blog/create", controllers.blog.create.post);

// Article read page : Read single blog
router.get("/blog/:id", controllers.blog.read.get);

// Article updade page : Read single blog
router.get("/blog/update/:id", controllers.blog.update.get);

// Article update : Update single blog
router.post("/blog/update/:id", controllers.blog.update.post);

// Article delete page : Delete single blog
router.get("/blog/delete/:id", controllers.blog.delete.get);

// Article delete : Delete single blog
router.post("/blog/delete/:id", controllers.blog.delete.post);


// Create user page
router.get("/user/create", controllers.user.create.get);

// Create user : Create user
router.post("/user/create", controllers.user.create.post);

// Login user page
router.get("/user/login", controllers.user.login.get);

// Login user : Read user
router.post("/user/login", controllers.user.login.post);


module.exports = router;