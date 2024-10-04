import { PrivetBaseUrl } from "../api/baseUrl/BaseUrl"
import useRefreshToken from "./useRefreshToken";
import useAuth from "../zustand/useAuth";
// import CurrentUser from "../api/authentication/CurrentUser";
import { useEffect } from "react";
const useAxiosPrivet = () => {
  const refresh = useRefreshToken()
  const authData = useAuth((state) => state.authData)

  useEffect(() => {

    const requestIntercepter = PrivetBaseUrl.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authData?.accessToken}`
        }
        return config
      }, (error) => { Promise.reject(error) }
    )

    const responseIntercepter = PrivetBaseUrl.interceptors.response.use(
      response => { return response },

      async error => {
        const previousRequest = error?.config


        if (error?.response?.status === 401 && !previousRequest?.sent) {
          previousRequest.sent = true
          try {
            const newAccessToken = await refresh()
            previousRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
            return PrivetBaseUrl(previousRequest)
          } catch (refreshError) {
            console.error("Failed to refresh access token", refreshError);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error)
      }

    )

    return () => {
      PrivetBaseUrl.interceptors.request.eject(requestIntercepter)
      PrivetBaseUrl.interceptors.response.eject(responseIntercepter)
    }

  }, [authData, refresh])

  return PrivetBaseUrl

}

export default useAxiosPrivet
