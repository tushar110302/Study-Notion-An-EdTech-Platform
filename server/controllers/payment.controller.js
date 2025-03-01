import {instance} from '../config/razorpay.js';
import { Course } from '../models/course.model.js';
import { User } from '../models/user.model.js';
import {sendMail} from '../utils/mailSender.js';
import { courseEnrollmentEmail } from '../mail/templates/courseEnrollmentEmail.js';
import mongoose from 'mongoose';
import crypto from 'crypto';

const enrollStudent = async (courses, userId, res) => {
    try {
        if(!courses || !userId){
            return res.status(400).json({
                success: false,
                message: 'Valid Course ID is required'
            });
        }

        for(let courseId of courses){
            const updatedCourse = await Course.findByIdAndUpdate(courseId,
                {
                    $push : {studentsEnrolled: userId}
                },
                {new: true}
            );
            if(!updatedCourse){
                return res.status(404).json({
                    success: false,
                    message: `Course ${courseId} not found`
                });
            }

            const updatedStudent = await User.findByIdAndUpdate(userId,
                {
                    $push: {
                        courses: courseId
                    }
                },
                {new: true}
            );

            if(!updatedStudent){
                return res.status(404).json({
                    success: false,
                    message: `User ${userId} not found`
                });
            }

            const mailResponse = await sendMail(
                updatedStudent.email, 
                courseEnrollmentEmail(
                    updatedCourse.courseName, 
                    updatedStudent.firstName+' '+updatedStudent.lastName
                ), 
                "Congratulations!! You have successfully enrolled in the course"
            );
            console.log('EMAIL SENT FOR ENROLLMENT', mailResponse);

        }
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: 'Could not enroll student',
            error
        });

    }

}

const capturePayment = async (req, res) => {
    try {
        const {courses} = req.body;
        const userId = req.user._id;

        if(courses.length ==0){
            return res.status(400).json({
                success: false,
                message: 'Valid Course ID is required'
            })
        }
        let totalAmount = 0;

        for(let courseId of courses){
            const course = await Course.findById(courseId);
            if(!course) {
                return res.status(404).json({
                    success: false,
                    message: `Course ${courseId} not found`
                });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(400).json({
                    success: false,
                    message: `You are already enrolled in course ${courseId}`
                });
            }

            totalAmount += course.price;
        }
        const options = {
            amount: amount * 100,
            currency,
            receipt: `receipt_${userId}_${Date.now().toString()}`,
            // notes: {
            //     courseId,
            //     userId
            // }
        };

        const paymentResponse = await instance.orders.create(options);
        console.log("PAYMENT RESPONSE: ")
        console.log(paymentResponse);

        return res.status(200).json({
            success: true,
            data: {
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount
            },
        });
        

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

const verifySignature = async (req, res) => {
    try {
        const {razorpay_signature, razorpay_payment_id, razorpay_order_id} = req.body;
        const courses = req.body.courses;
        const userId = req.user._id;

        if(!razorpay_signature || !razorpay_payment_id || !razorpay_order_id || !courses){
            return res.status(400).json({
                success: false,
                message: 'Some field(s) are missing'
            });
        }

        const secret = process.env.RAZORPAY_SECRET;
        let body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac('sha256', secret).update(body.toString()).digest('hex');

        if(expectedSignature !== razorpay_signature){

            await enrollStudent(courses, userId, res);

            return res.status(200).json({
                success: true,
                message: 'Payment verification Success'
            });
        }

        return res.status(200).json({
            success: false,
            message: 'Payment verification Failed'
        });

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// *************** BELOW WORKS FOR A SINGLE COURSE ****************
// const capturePayment = async (req, res) => {
//     try {
//         const { courseId } = req.body;
//         const userId = req.user._id;

//         if(!courseId) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Valid Course ID is required'
//             });
//         }

//         const course = await Course.findById(courseId);
//         if(!course) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Course not found'
//             });
//         }

//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'You are already enrolled in this course'
//             });
//         }

//         const amount = course.price;
//         const currency = "INR";
        
//         const options = {
//             amount: amount * 100,
//             currency,
//             receipt: `receipt_${courseId}_${userId}`,
//             notes: {
//                 courseId,
//                 userId
//             }
//         };

//         const paymentResponse = await instance.orders.create(options);
//         console.log("PAYMENT RESPONSE: ")
//         console.log(paymentResponse);

//         return res.status(200).json({
//             success: true,
//             data: {
//                 courseName: course.courseName,
//                 courseDescription: course.courseDescription,
//                 thumbnail: course.thumbnail,
//                 orderId: paymentResponse.id,
//                 currency: paymentResponse.currency,
//                 amount: paymentResponse.amount
//             },
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         });
        
//     }
// }

// const verifySignature = async (req, res) => {
//     try {
//         const webHookSecret = "123456789"
//         const signature = req.headers["x-razorpay-signature"];

//         const shaSum = crypto.createHmac("sha256", webHookSecret);
//         shaSum.update(JSON.stringify(req.body));
//         const digest = shaSum.digest("hex");

//         if(signature !== digest) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid Signature'
//             });
//         }
//         console.log("Request is Authorised");
//         console.log(req.body);

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         const course = await Course.findByIdAndUpdate(courseId, 
//             {
//                 $push: {
//                     studentsEnrolled: userId
//                 }
//             },
//             {
//                 new: true
//             }
//         );
//         console.log("Course Updated: ");
//         console.log(course);

//         const user = await User.findByIdAndUpdate(userId,
//             {
//                 $push: {
//                     courses: courseId
//                 }
//             },
//             {new: true}
//         )

//         const body = courseEnrollmentEmail(course.courseName, user.firstName+' '+user.lastName);
//         await sendMail(user.email, body, "Congratulations!! You have successfully enrolled in the course");

//         return res.status(200).json({
//             success: true,
//             message: 'Signature Verified & Course enrolled successfully'
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error and Course not enrolled'
//         });
//     }

// }

export {
    capturePayment,
    verifySignature
};
