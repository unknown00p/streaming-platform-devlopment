import baseUrl from "../api/baseUrl/BaseUrl";
import useAuth from "../zustand/useAuth";

const useRefreshToken = () => {
    const setAuthData = useAuth(state => state.setAuthData)
    // const authData = useAuth(state => state.authData)

    const refresh = async () => {
        try {
            const response = await baseUrl.post("/users/refresh-token", {}, { withCredentials: true })
            console.log(response.data.data.accessToken);


            if (response.status === 200) {
                setAuthData(response.data.data.accessToken)
            }
            return response.data.data.accessToken
        } catch (error) {
            console.log(error)
        }
    }

    return refresh
}

export default useRefreshToken

// accessToke -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmZjMzEyMDJmYmY4NTM3MzRhOTUyMTgiLCJlbWFpbCI6InBvcEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InBvcCIsImZ1bGxOYW1lIjoicG9waW5zIiwiaWF0IjoxNzI4MDM5NzYyLCJleHAiOjE3MjgwMzk3ODJ9.bxOuKH68D48oL9JS6rWTCcnd2JVJzXigZY9hUPWUAfg

// newAccessToken -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmZjMzEyMDJmYmY4NTM3MzRhOTUyMTgiLCJlbWFpbCI6InBvcEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InBvcCIsImZ1bGxOYW1lIjoicG9waW5zIiwiaWF0IjoxNzI4MDM5ODU5LCJleHAiOjE3MjgwMzk4Nzl9.iD7PPR6hiZfmR8Sa7fzy_Jc3BOL6iZUV5DKUdmVaUrI


// refreshToken -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmZjMzEyMDJmYmY4NTM3MzRhOTUyMTgiLCJpYXQiOjE3MjgwMzk3NjIsImV4cCI6MTcyODY0NDU2Mn0.u8e7QW35n5Uh-54oIvnkKf5M2b3sm7wVV9VyQOxr0ck

// newRefreshToken -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmZjMzEyMDJmYmY4NTM3MzRhOTUyMTgiLCJpYXQiOjE3MjgwMzk3NjIsImV4cCI6MTcyODY0NDU2Mn0.u8e7QW35n5Uh-54oIvnkKf5M2b3sm7wVV9VyQOxr0ck