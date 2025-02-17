import toast from "react-hot-toast";
import { authEndpoints } from "../api"
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { resetCart } from "../../slices/cartSlice";

const {SENDOTP_API, SIGNUP_API, LOGIN_API, CHANGEPASSWORD_API, RESETPASSTOKEN_API, RESETPASSWORD_API} = authEndpoints

export const sendOtp = async(email, navigate, dispatch) => {

    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));
    try {
        const response = await apiConnector("POST", SENDOTP_API, {email});
        console.log("Send OTP Response")
        console.log(response);

        if(!response.data.success){
            console.log("SEND OTP FAILED.............")

        }
        toast.success("OTP Sent Successfully");
        navigate("/verify-email")

    } catch (error) {
        console.log("SEND OTP API ERROR............", error)
        toast.error("SEND OTP Failed")
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
}
export const login = async(email, password, navigate, dispatch) =>{

    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
        const response = await apiConnector("POST", LOGIN_API, {email, password});
        console.log("Login response")
        console.log(response)

        if(!response.data.success){
            console.log("LOGIN FAILED.............")
            return;
        }
        toast.success("Login Successful")

        dispatch(setUser({...response.data.data.user}));
        dispatch(setToken(response.data.data.token));
        localStorage.setItem("token", JSON.stringify(response.data.data.token));

        navigate("/dashboard/my-profile")

    } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
}

export const logout = async(navigate, dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }

export const signup = async(firstName, lastName, email, password, otp, accountType, navigate, dispatch) => {
    
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", SIGNUP_API, {
            firstName, 
            lastName, 
            email, 
            password, 
            otp, 
            accountType
        });
        console.log("Signup Response");
        console.log(response);

        if(!response.data.success){
            console.log("SIGNUP FAILED.............");
            return;
        }
        toast.success("Signup Successful");
        navigate("/login");

    } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);

}

export const resertPasswordToken = async(email, setEmailSent, navigate, dispatch) =>{
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
        const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});
        console.log("RESETPASSTOKEN RESPONSE............", response)

        if (!response.data.success) {
            console.log("RESET PASSWORD TOKEN FAILED.............")
            return;
          }

        toast.success("Reset Email Sent")
        setEmailSent(true);
    } catch (error) {
        console.log("RESETPASSTOKEN ERROR............", error)
        toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
}

export const resetPassword = async(password, token, navigate, dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
        const response = await apiConnector("POST", RESETPASSWORD_API, {password, token});
        console.log("RESET PASSWORD RESPONSE............", response)

        if (!response.data.success) {
            console.log("RESET PASSWORD FAILED.............");
            return;
        }

        toast.success("Password Reset Successfully")
        navigate("/login")
    } catch (error) {
        console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
}