import nodemailer from "nodemailer"

export const sendMail = async (email, body, subject) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
        });

        const mailOptions = {
            from: 'StudyNotion || Tushar Ranjan',
            to: email,
            subject: subject,
            html: body,
        }
        const mailResponse = await transporter.sendMail(mailOptions);
        console.log("Mail Sent Successfully");
        // console.log(mailResponse);
        return mailResponse

    } catch (error) {
        console.error("Could not Send Mail", error)
    }
}