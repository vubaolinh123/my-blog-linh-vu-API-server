import mongoose, { Schema } from "mongoose";


const social = new Schema({
    name: {
        type: String,
        required: true,
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
    linkTo: {
        type: String,
    },
    status: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

export default mongoose.model("social", social)