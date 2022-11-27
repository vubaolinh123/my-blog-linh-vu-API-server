import mongoose, { Schema } from "mongoose";
var URLSlug = require('mongoose-slug-generator');

mongoose.plugin(URLSlug);

const tagBlogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: { 
        type: String, 
        slug: "name",
        unique: true 
    }
}, { timestamps: true })

export default mongoose.model("tagBlog", tagBlogSchema)