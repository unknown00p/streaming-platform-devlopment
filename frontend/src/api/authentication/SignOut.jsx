import BaseUrl from "../baseUrl/BaseUrl"

async function SignOut() {
    try {
        const response = await BaseUrl.post("/users/logout",{},{withCredentials: true})
        console.log(response);        
        return response
    } catch (error) {
        console.log(error);
        return null
    }
}

export default SignOut
