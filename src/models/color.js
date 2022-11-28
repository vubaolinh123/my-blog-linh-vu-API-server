import mongoose, { Schema } from "mongoose";

const colorSchema = new Schema({
    bgTop: {
        type: String,
        required: true,
    },
    bgHeader: { 
        type: String, 
        required: true,
    },
    textTop: { 
        type: String, 
        required: true,
    },
    textLogo: { 
        type: String, 
        required: true,
    },
    textMenu: { 
        type: String, 
        required: true,
    },
    textMenuHover: { 
        type: String, 
        required: true,
    },
    iconSun: { 
        type: String, 
        required: true,
    },
    iconFolder: { 
        type: String, 
        required: true,
    },
    iconGear: { 
        type: String, 
        required: true,
    },
    iconImage: { 
        type: String, 
        required: true,
    },
    iconPen: { 
        type: String, 
        required: true,
    },
    bgBtn: { 
        type: String, 
        required: true,
    },
    bgBtnHover: { 
        type: String, 
        required: true,
    },
    bgMain: { 
        type: String, 
        required: true,
    },
    textMain: { 
        type: String, 
        required: true,
    },
    textMainLink: { 
        type: String, 
        required: true,
    },
    bgMainContent: { 
        type: String, 
        required: true,
    },
    asideLink: { 
        type: String, 
        required: true,
    },
    bgFooter: { 
        type: String, 
        required: true,
    },
    textFooter: { 
        type: String, 
        required: true,
    },
    textLinkFooter: { 
        type: String, 
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    intro: {
        type: String,
        required: true,
    },
    subTextLogo: {
        type: String,
        required: true,
    },
    urlFb: {
        type: String,
        required: true,
    },
    urlYt: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const color = mongoose.model('Color', colorSchema);

export default color;