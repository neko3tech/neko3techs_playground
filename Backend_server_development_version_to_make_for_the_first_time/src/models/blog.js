// const mongoose = require("mongoose");
const mongoose = require("mongoose");

// blog schema setting
const schema = new mongoose.Schema({
    title: String,
    summary: String,
    image: String,
    textBody: String,
});

// blog model
const model = mongoose.model("Blog", schema);

module.exports = {
    /** Get all blog data */
    getAll: async () => {
        return await model.find();
    },
    // Get selected blog data
    get: async (blogId) => {
        return await model.findById(blogId);
    },
    /** Create new blog data */
    post: async ({ title, summary, image, textBody }) => {
        return await model.create({ title, summary, image, textBody });
    },
    /** Edit selected blog data */
    edit: async (blogId, { title, summary, image, textBody }) => {
        return await model.updateOne({ _id: blogId }, { title, summary, image, textBody });
    },
    /** Delete selected blog data */
    delete: async (blogId) => {
        return await model.deleteOne({ _id: blogId });
    }
};