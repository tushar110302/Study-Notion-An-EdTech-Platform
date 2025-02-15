import axios from "axios"

export const axiosInstance = axios.create({})

export const apiConnector = (method, url, body=null, headers=null, params=null) => {
    return axiosInstance({
        method: method,
        url: url,
        data: body,
        headers: headers,
        params: params
    })
}