import mongoose from "mongoose";

const subSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    duration: {
        type: String,
    },
    description: {
        type: String,
        trim: true
    },
    videoUrl: {
        type: String,
        trim: true
    }
}, {timestamps: true});

export const subSection = mongoose.model("SubSection", subSectionSchema);