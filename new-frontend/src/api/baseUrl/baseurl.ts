import axios from "axios"

const url:string = import.meta.env.VITE_BACKEND_API_URL

const baseUrl = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    },
})


export const PrivetBaseUrl = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    },
})

export default baseUrl