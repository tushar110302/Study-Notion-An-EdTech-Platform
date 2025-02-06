import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    nmae: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
}, {timestamps: true});

export const Category = mongoose.model("Category", tagSchema);