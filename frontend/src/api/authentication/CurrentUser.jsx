import { useEffect } from "react"
import useAxiosPrivet from "../../hooks/useAxiosPrivet"
import { useNavigate, useLocation } from "react-router-dom"
function CurrentUser() {
    const PrivetBaseUrl = useAxiosPrivet()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const controller = new AbortController()
        // let isMounted = true
        async function getUser() {
            try {
                const response = await PrivetBaseUrl.get("/users/current-user", {
                    withCredentials: true,
                    signal: controller.signal
                })
                console.log(response);
                
                // if (isMounted) {
                //     return response.data
                // }
            } catch (error) {
                if (error.code !== "ERR_CANCELED") {
                    navigate("/login", { state: { form: location }, replace: true })
                }
            }
        }

        getUser()

        return () => {
            // isMounted = false
            controller.abort()
        }
    }, [])

    return (
        <>
        </>
    )

}

export default CurrentUser
