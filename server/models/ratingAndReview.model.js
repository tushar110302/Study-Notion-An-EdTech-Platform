import mongoose from "mongoose";

const ratingAndReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    review: {
        type: String,
        required: true,
        trim: true
    },
}, {timestamps: true});

export const RatingAndReview = mongoose.model("RatingAndReview", ratingAndReviewSchema);