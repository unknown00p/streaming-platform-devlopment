import BaseUrl from "../baseUrl/BaseUrl";

async function SignIn({ email, password }) {
    console.log(email, password);    
    try {
        const response = await BaseUrl().post("/users/login", {
            email: email,
            password: password
        })

        return response
    } catch (error) {
        console.log(error);
        return null        
    }
}

export default SignIn