import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    nmae: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
}, {timestamps: true});

export const Tag = mongoose.model("Tag", tagSchema);