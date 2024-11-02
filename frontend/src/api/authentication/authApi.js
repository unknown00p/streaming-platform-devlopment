import baseUrl from "../baseUrl/BaseUrl";

async function SignIn({ email, password }) {
    try {
        const response = await baseUrl.post("/users/login", {
            email: email,
            password: password
        },
            { withCredentials: true }
        )

        return response
    } catch (error) {
        console.log(error?.response?.data);
        return null
    }
}

async function SignOut() {
    try {
        const response = await baseUrl.post("/users/logout", {}, { withCredentials: true })
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        return null
    }
}

async function SignUp({ username, fullname, email, password, avatar, coverImage }) {
    // console.log(username, fullname, email, password, avatar[0], coverImage[0]);
    const formData = new FormData();

    const defaultAvatar = new File(
        [await fetch("/images/avatar.png").then((res) => res.blob())],
        "defaultAvatar.png",
        { type: "image/png" }
    )

    const defaultCoverImage = new File(
        [await fetch("/images/coverImage.jpg").then((res) => res.blob())],
        "defaultCoverImage.jpg",
        { type: "image/jpg" }
    )

    formData.append("username", username);
    formData.append("fullName", fullname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar[0] || defaultAvatar);
    formData.append("coverImage", coverImage[0] || defaultCoverImage);    

    try {
        const register = await baseUrl.post("/users/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        },)
        return register
    } catch (error) {
        console.error("Error during registration:", error);
        return null;
    }
}

async function userById(userId) {
    try {
        const response = await baseUrl.get("/users/userById", {
            params: { userId },
            withCredentials: true
        })

        return response
    } catch (error) {
        console.log(error);
    }
}

async function currentUser(params) {
    const response = await baseUrl.get('/users/current-user',{
        withCredentials: true
    })
    return response
}

export { SignIn, SignOut, SignUp, userById, currentUser }