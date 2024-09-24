import { useEffect } from "react"
import BaseUrl from "../baseUrl/BaseUrl"
function CurrentUser() {
    useEffect(() => {
        const controller = new AbortController()
        let isMounted = true
        async function getUser() {
            try {
                const response = await BaseUrl.get("/users/current-user",{
                    withCredentials: true,
                    signal: controller.signal
                })
                console.log(response);
                if (isMounted) {
                    return response.data
                }
            } catch (error) {
                console.log(error)
            }
        }

        getUser()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    return(
        <>
        </>
    )

}

export default CurrentUser
