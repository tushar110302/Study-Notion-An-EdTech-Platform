import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    sectionName: {
        type: String,
        trim: true
    },
    subSections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress",
            required: true
        }
    ]
}, {timestamps: true});

export const Section = mongoose.model("Section", sectionSchema);