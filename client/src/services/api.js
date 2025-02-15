const BASE_URL = import.meta.env.VITE_BASE_URL;

export const categories = {
    CATEGORY_API: `${BASE_URL}/course/showAllCategories`
}

export const authEndpoints = {
    SENDOTP_API: `${BASE_URL}/auth/sendotp`,
    SIGNUP_API: `${BASE_URL}/auth/signup`,
    LOGIN_API:`${BASE_URL}/auth/login`,
    RESETPASSTOKEN_API: `${BASE_URL}/auth/reset-password-token` ,
    RESETPASSWORD_API: `${BASE_URL}/auth/reset-password`,
    CHANGEPASSWORD_API: `${BASE_URL}/auth/changePassword`
}