import baseUrl from "../baseUrl/BaseUrl";

async function toggleVideoLike(videoId) {
    const response = await baseUrl.post(`/likes/toggle/v/${videoId}`, {}, {
        withCredentials: true
    })
    return response
}

async function getVideoLikes(videoId, userId) {  
    const response = await baseUrl.get(`/likes/videoLikes/${videoId}`, {
        params: { userId: userId }
    })

    return response
}

export {
    toggleVideoLike,
    getVideoLikes
}