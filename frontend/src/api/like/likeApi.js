import baseUrl from "../baseUrl/BaseUrl";

async function toggleVideoLike(videoId) {
    try {
        const response = await baseUrl.post(`/likes/toggle/v/${videoId}`, {}, {
            withCredentials: true
        })
        return response
    } catch (error) {
        console.log(error);
        throw error        
    }
}

async function getVideoLikes(videoId, userId) {  
    try {
        const response = await baseUrl.get(`/likes/videoLikes/${videoId}`, {
            params: { userId: userId }
        })
    
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}

export {
    toggleVideoLike,
    getVideoLikes
}