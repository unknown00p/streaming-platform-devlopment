import baseUrl from "../baseUrl/BaseUrl"

async function UpdateEmailPassword(fullName, email) {
    // console.log(fullName, email);

    try {
        const updatedValue = await baseUrl.patch("/users/update-account",
            {
                fullName: fullName,
                email: email
            },
            { withCredentials: true }
        )

        return updatedValue
    } catch (error) {
        console.log(error);
    }
}

async function UpdateAvatar(avatarFile) {
    try {
        const formData = new FormData()
        formData.append("avatar", avatarFile)

        const response = await baseUrl.patch("/users/avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })
        return response
    } catch (error) {
        console.log(error);
    }
}

async function UpdateCoverImage(CoverImage) {
    try {
        // console.log(CoverImage);

        const formData = new FormData()
        formData.append("coverImage", CoverImage)

        const response = await baseUrl.patch("/users/cover-image", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        })
        return response
    } catch (error) {
        console.log(error);
    }
}

async function changeCurrentPassword({ oldPassword, newPassword }) {
    // console.log(oldPassword, newPassword);

    try {
        const response = await baseUrl.post("/users/change-password", {
            oldPassword,
            newPassword
        }, { withCredentials: true })

        return response
    } catch (error) {
        console.log(error);
    }
}


export {
    UpdateEmailPassword,
    UpdateAvatar,
    UpdateCoverImage,
    changeCurrentPassword
}
