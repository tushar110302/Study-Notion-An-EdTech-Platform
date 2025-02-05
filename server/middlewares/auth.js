import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) 
            return res.status(401).json({success: false, message: "Token not found"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?._id).select("-password");
        if(!user){
            return res.status(401).json({success: false, message: "Invalid Token"});
        }

        req.user = user; // Adding new field to req named user
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: "Error: Invalid Token"});
    }
}

const isStudent = (req, res, next) =>{
    try {
        if(req.user.accountType !== "Student"){
            return res.status(403).json({success: false, message: "Forbidden"});
        }
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: "Invalid Token"});
    }
}
const isAdmin = (req, res, next) =>{
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(403).json({success: false, message: "Forbidden"});
        }
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: "Invalid Token"});
    }
}
const isInstructor = (req, res, next) =>{
    try {
        if(req.user.accountType !== "Instructor"){
            return res.status(403).json({success: false, message: "Forbidden"});
        }
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: "Invalid Token"});    
    }
}

export {
    verifyJWT,
    isStudent,
    isAdmin,
    isInstructor
}