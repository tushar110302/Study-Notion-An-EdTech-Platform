import mongoose from "mongoose";
import { sendMail } from "../utils/mailSender.js";

const optSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
}, {timestamps: true});

optSchema.index({"createdAt": 1}, {expireAfterSeconds: 6000});

optSchema.pre('save', async function (next) {
    try {
        const subject = "OTP for Verification";
        const body = `<h3>You OTP code for email verification is: </h3><p>${this.otp}</p><p>Please do not share this code with anyone</p><p>This code will be valid for next 10 minutes.</p><p>Thank You</p><p>Study Notion</p>`
        const response = await sendMail(this.email,body,subject);
        // console.log(response);
        next();
    } catch (error) {
        console.error("Could not send mail before saving", error)
    }
})

export const OTP = mongoose.model("OTP", optSchema);