import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        trim: true
    },
    dateOfBirth: {
        type: String,
        trim: true
    },
    about: {
        type: String,
        trim: true
    },
    phone: {
        type: Number,
        trim: true
    }
}, {timestamps: true});

export const Profile = mongoose.model("Profile", profileSchema);