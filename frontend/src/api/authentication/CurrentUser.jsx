import { useEffect } from "react"
import useAxiosPrivet from "../../hooks/useAxiosPrivet"
import { useNavigate, useLocation } from "react-router-dom"
import userData from "../../zustand/userData"
function CurrentUser() {
    const PrivetBaseUrl = useAxiosPrivet()
    const navigate = useNavigate()
    const location = useLocation()
    const setCurrentUserData = userData((state) => state.setCurrentUserData)

    useEffect(() => {
        const controller = new AbortController()
        let isMounted = true
        async function getUser() {
            try {
                const response = await PrivetBaseUrl.get("/users/current-user", {
                    withCredentials: true,
                    signal: controller.signal
                })

                // if (response) {

                // }


                if (isMounted) {
                    setCurrentUserData(response.data.data)
                    return response.data
                }
            } catch (error) {
                // if (error.code !== "ERR_CANCELED") {
                //     navigate("/", { state: { form: location }, replace: true })
                // }
                // console.log(error);
            }
        }

        getUser()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])
}

export default CurrentUser
