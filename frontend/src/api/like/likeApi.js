import baseUrl from "../baseUrl/BaseUrl";

async function toggleVideoLike(videoId) {
    try {
        const response = await baseUrl.post(`/likes/toggle/v/${videoId}`, {}, {
            withCredentials: true
        })
        return response
    } catch (error) {
        // console.log(error);
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
        // console.log(error);
        throw error
    }
}

async function toggleCommentLike(commentId) {
    // console.log(commentId);

    try {
        const response = await baseUrl.post(`/likes/toggle/c/${commentId}`, {}, {
            withCredentials: true
        })
        return response
    } catch (error) {
        // console.log(error);
    }
}

async function getCommentLikes(commentId, userId) {
    try {
        const response = await baseUrl(`/likes/commentLikes/${commentId}`, {
            params: { userId: userId }
        })
        return response
    } catch (error) {
        // console.log(error);
    }
}

export {
    toggleVideoLike,
    getVideoLikes,
    toggleCommentLike,
    getCommentLikes
}