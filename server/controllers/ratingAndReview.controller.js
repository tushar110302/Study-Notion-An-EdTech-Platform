import {RatingAndReview} from '../models/ratingAndReview.model.js';
import {Course} from '../models/course.model.js';
import mongoose from 'mongoose';

const createRating = async (req, res) => {
    try {
        const userId = req.user._id;
        const {rating, review, courseId} = req.body;

        if(!rating || !review || !courseId){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const course = await Course.findOne( {courseId,
            studentsEnrolled: {$elemMatch: {$eq: userId} }
        });

        if(!course){
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in this course"
            });
        }


        const checkReviewed = await RatingAndReview.findOne({user: userId, course: courseId});
        if(checkReviewed){
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this course"
            });
        }

        const newRatingAndReview = await RatingAndReview.create({
            rating,
            review,
            user: userId,
            course: courseId
        });

        await Course.findByIdAndUpdate(courseId, 
            {
                $push: {
                    ratingAndReviews: newRatingAndReview._id
                }
            },
        );

        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully",
            data: newRatingAndReview
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Could not create rating"
        });
    }
}

const getAverageRating = async (req, res) => {
    try {
        const {courseId} = req.body;
        if(!courseId){
            return res.status(400).json({
                success: false,
                message: "Course ID is required"
            });
        }

        // const course = await Course.findById(courseId).populate("ratingAndReviews");
        // const ratings = course.ratingAndReviews.map((rating) => rating.rating);
        // const totalRatings = ratings.length;
        // const sum = ratings.reduce((a, b) => a + b, 0);
        // const averageRating = sum/totalRatings;

        const result = await RatingAndReview.aggregate([
            {
                $match: {course: new mongoose.Types.ObjectId(courseId)}
            },
            {
                $group: {
                    _id: null,
                    averageRating: {$avg: "$rating"}
                }
            }
        ])

        if(result.length === 0){
            return res.status(200).json({
                success: true,
                message: "No ratings yet",
                averageRating: 0
            });
        }

        return res.status(200).json({
            success: true,
            message: "Average rating fetched successfully",
            averageRating: result[0].averageRating
        });
         
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Could not fetch average rating"
        });
    }
}

const getAllRatingAndReviews = async (req, res) => {
    try {
        const allRatingAndReviews = await RatingAndReview.find({}).sort({rating: "desc"}).populate("user", "firstName lastName profileImage email").populate("course", "courseName");

        return res.status(200).json({
            success: true,
            message: "Ratings and reviews fetched successfully",
            allRatingAndReviews
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Could not fetch ratings and reviews"
        });
    }
}

export {createRating, getAverageRating, getAllRatingAndReviews}