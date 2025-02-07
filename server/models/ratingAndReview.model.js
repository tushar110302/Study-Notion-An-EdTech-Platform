import mongoose from "mongoose";

const ratingAndReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    review: {
        type: String,
        required: true,
        trim: true
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
}, {timestamps: true});

export const RatingAndReview = mongoose.model("RatingAndReview", ratingAndReviewSchema);