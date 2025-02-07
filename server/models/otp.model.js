import mongoose from "mongoose";
import { sendMail } from "../utils/mailSender.js";
import { otpTemplate } from "../mail/templates/emailVerificationTemplate.js";

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

optSchema.index({createdAt: 1}, {expireAfterSeconds: 6000});

optSchema.pre('save', async function (next) {
    try {
        const subject = "OTP for Verification";
        const body = otpTemplate(this.otp);
        const response = await sendMail(this.email,body,subject);
        // console.log(response);
        next();
    } catch (error) {
        console.error("Could not send mail before saving", error)
    }
})

export const OTP = mongoose.model("OTP", optSchema);