import BaseUrl from "../baseUrl/BaseUrl"
function RefreshAccessToken() {
  BaseUrl().interceptors.response.use(
    response => response,

    async error => {}
  )
}

export default RefreshAccessToken
