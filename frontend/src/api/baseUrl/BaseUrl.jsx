import axios from "axios"
function BaseUrl() {
    const url = import.meta.env.VITE_BASE_URL
    console.log(url);    
    const baseUrl = axios.create({
        baseURL: url,
        headers:{
            "Content-Type": "application/json"
        }
    })

    return baseUrl
}

export default BaseUrl