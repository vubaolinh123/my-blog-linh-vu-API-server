import mongoose, { Schema } from "mongoose";
var URLSlug = require('mongoose-slug-generator');

mongoose.plugin(URLSlug);

const { ObjectId } = mongoose.Types
const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: { 
        type: String, 
        slug: "title",
        unique: true 
    },
    poster: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    shortDesc: {
        type: String,
    },
    status: {
        type: Number,
        default: 0
    },
    categoryBlog: [{
        type: ObjectId,
        ref: "categoryBlog",
        required: true
    }],
    tagBlog: [{
        type: ObjectId,
        ref: "tagBlog",
        required: true
    }]
}, { timestamps: new Date() });

blogSchema.index({ name: 'text' });


const Blogs = mongoose.model('Blog', blogSchema);


export default Blogs;