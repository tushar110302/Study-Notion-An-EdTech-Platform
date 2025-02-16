import mongoose from "mongoose";
import bcyrpt from "bcrypt";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        emum: ["Admin", "Student", "Instructor"],
        required: true
    },
    profileDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    profileImage: {
        type: String,
        trim: true
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordTokenExpire: {
        type: Date,
    },
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress"
        }
    ],
}, {timestamps: true});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcyrpt.hash(this.password, 10);
    next()
})
export const User = mongoose.model("User", userSchema);