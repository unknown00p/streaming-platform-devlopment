import { PrivetBaseUrl } from "../baseUrl/BaseUrl"
function RefreshAccessToken() {

  PrivetBaseUrl.interceptors.response.use(
    response => { console.log(response); return response },

    async error => {
      const originalRequest = error.config

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const { data } = await PrivetBaseUrl.post("/users/refresh-token")

          PrivetBaseUrl.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`
          originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`
          return PrivetBaseUrl.request(originalRequest)

        } catch (refreshError) {
          console.error("Failed to refresh access token", refreshError);
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }

  )
}

export default RefreshAccessToken
