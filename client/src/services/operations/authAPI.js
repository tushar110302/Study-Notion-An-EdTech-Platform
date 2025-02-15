import toast from "react-hot-toast";
import { authEndpoints } from "../api"
import { useDispatch } from "react-redux";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";

const {SENDOTP_API, SIGNUP_API, LOGIN_API, CHANGEPASSWORD_API} = authEndpoints

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

