import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import otpGenerator from 'otp-generator';
import { Profile } from "../models/profile.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendMail } from "../utils/mailSender.js";
import { passwordUpdated } from "../mail/templates/passwordUpdate.js";

const generateToken = (user) => {
    return jwt.sign({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
        }, 
        process.env.JWT_SECRET, 
        {expiresIn: "2h"}
    );
    
}

const sendOTP = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});

        if(user){
            return res.status(401).json({
                success: false,
                message: "User already exists"}
            );
        }

        const otp = otpGenerator.generate(6, {upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false});
        console.log("OTP Generated", otp);

        const savedDetails = await OTP.findOne({email});
        if(!savedDetails){
            const newOTP = await OTP.create({
                email,
                otp
            })
            return res.status(200)
            .json({
                success: true,
                message: "OTP sent successfully",
                data: newOTP
            });
        }
        else{
            savedDetails.otp = otp;
            await savedDetails.save();
            return res.status(200)
            .json({
                success: true,
                message: "OTP sent successfully",
                data: savedDetails 
            });
        }
        
    } catch (error) {
        return res.status(500)
        .json({
            success: false,
            message: "OTP not sent"}
        );
    }
}

const singup = async (req, res) => {
    try {
        const {firstName, lastName, email, password, otp, accountType} = req.body;

        if(!firstName || !lastName || !email || !password || !otp ) { 
            return res.status(400).json({
                success: false, 
                message: "All fields are required"
            });
        }
        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                success: false, 
                message: "User already exists "
            });
        }

        const savedOtp = await OTP.findOne({email});
        if(!savedOtp){
            return res.status(400).json({
                success: false, 
                message: "OTP not found"
            });
        }
        if(savedOtp.otp !== otp){
            return res.status(400).json({
                success: false, 
                message: "Invalid OTP"
            }); 
        }

        const profileDetails = await Profile.create({
            gender:"",
            dateOfBirth:"",
            phone:"",
            about:""
        })

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            accountType,
            profileDetails: profileDetails._id,
            profileImage: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}+${lastName}`,
        });

        return res.status(200)
        .json({
            success: true,
            data: newUser,
            message: "User created successfully"}
        );
    } catch (error) {
        return res.status(500)
        .json({
            success: false,
            message: "User not created"}
        );
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }   
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }   
        const check = await bcrypt.compare(password, user.password);
        if(!check){
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }
        const token = generateToken(user);

        const options = {
            httpOnly: true,
            secure: true
        }
        res.cookie("token", token, options).status(200)
        .json({
            success: true,
            message: "Login successful",
            data: token
        });


    } catch (error) {
        return res.status(500)
        .json({
            success: false,
            message: "Login failed"}
        );
    }
}

//change pass
const changePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body;
        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findById(req.user._id);
        const check = await bcrypt.compare(oldPassword, user.password);
        if(!check){
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }
        user.password = newPassword;
        await user.save();

        const body = passwordUpdated(user.email, user.firstName.concat(" ", user.lastName));
        const emailResponse = await sendMail(user.email, body, "Password Changed");

        return res.status(200)
        .json({
            success: true,
            message: "Password changed successfully"}
        );
    } catch (error) {
        return res.status(500)
        .json({
            success: false,
            message: "Could not change password"}
        );
    }
}

//forgot pass
const resetPassword = async (req, res) => { 
    const {email} = req.body;
    if(!email){
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }
    const user = await User.find({email});
    if(!user){
        return res.status(400).json({
            success: false,
            message: "User not found"
        });
    }   

}
export {sendOTP, singup, login, changePassword};