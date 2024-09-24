import BaseUrl from "../baseUrl/BaseUrl";

async function SignIn({ email, password }) {
    try {
        const response = await BaseUrl.post("/users/login", {
            email: email,
            password: password
        },
        {withCredentials: true}
    )

        return response
    } catch (error) {
        console.log(error?.response?.data);
        return null
    }
}

export default SignIn