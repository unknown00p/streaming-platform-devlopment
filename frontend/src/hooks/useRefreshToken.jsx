import baseUrl from "../api/baseUrl/BaseUrl";
import useAuth from "../zustand/useAuth";

const useRefreshToken = () => {
    const setAuthData = useAuth(state => state.setAuthData)
    // const authData = useAuth(state => state.authData)

    const refresh = async () => {
        try {
            const response = await baseUrl.post("/users/refresh-token", {}, { withCredentials: true })
            // console.log('response',response.data.data.accessToken);

            if (response.status === 200) {
                setAuthData(response.data.data.accessToken)
            }
            return response.data.data.accessToken
        } catch (error) {
            // console.log(error)
        }
    }

    return refresh
}

export default useRefreshToken