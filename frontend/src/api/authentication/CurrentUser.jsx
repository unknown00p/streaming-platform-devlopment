import BaseUrl from "../baseUrl/BaseUrl"
async function CurrentUser() {
    const controller = new AbortController()

    const response = await BaseUrl.get("/users/current-user")
    return response
}

export default CurrentUser
