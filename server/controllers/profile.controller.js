import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";

const updateProfile = async (req, res) => {
    try {
        const { gender, dateOfBirth="", about="", phone } = req.body;
        const userId = req.user._id;

        if(!gender || !phone){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findById(userId);
        const profile = await Profile.findById(user.profileDetails);

        profile.gender= gender;
        profile.dateOfBirth= dateOfBirth;
        profile.about= about;
        profile.phone= phone;

        await profile.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error: Could not update profile",
            error: error.message
        });
    }
}

const deleteAccount = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        await Profile.findByIdAndDelete(user.profileDetails);
        await User.findByIdAndDelete(userId);

        // REMOVE STUDENT FROM ALL COURSES

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });
  
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error: Could not delete account",
            error: error.message
        });
    }
}

export { updateProfile };