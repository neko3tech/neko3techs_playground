// const mongoose = require("mongoose");
const mongoose = require("mongoose");

// user schema setting
const schema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
});

// User model
const model = mongoose.model("User", schema);

module.exports = {
    /** Create new blog auther */
    add: async ({ name, email, password }) => {
        return await model.create({ name, email, password });
    },
    /** Get auther data */
    get: async ({ email }) => {
        return await model.findOne({ email });
    },
};