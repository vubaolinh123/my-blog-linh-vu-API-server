import mongoose, { Schema } from "mongoose";
var URLSlug = require('mongoose-slug-generator');

mongoose.plugin(URLSlug);

const categoryBlog = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: { 
        type: String, 
        slug: "name",
        unique: true 
    },
    urlIcon: {
        type: String,
    },
    colorIcon: {
        type: String,
    },
    sizeIcon: {
        type: String,
    },
    status: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

export default mongoose.model("categoryBlog", categoryBlog)