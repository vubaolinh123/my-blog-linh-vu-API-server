import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types

const commentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        required: true,
    },
    Blog: {
        type: ObjectId,
        ref: "Blog"
    },

}, { timestamps: true });

const comment = mongoose.model('comment', commentSchema);
export default comment;