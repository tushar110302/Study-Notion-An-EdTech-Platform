import { contactUsTemplate } from "../mail/templates/contactFormRes.js"
import { sendMail } from "../utils/mailSender.js"

const contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body

  try {
    const emailRes = await sendMail(
      email,
      contactUsTemplate(email, firstname, lastname, message, phoneNo, countrycode),
      "Your Data send successfully"
    )
    // console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
    
  } 
  catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}
export {contactUsController}
