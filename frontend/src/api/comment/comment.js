import baseUrl from "../baseUrl/BaseUrl";

async function getVideoComments(videoId) {
    try {
        const response = await baseUrl.get(`/comments/${videoId}`)
        // // console.log(response);
        return response
    } catch (error) {
        // console.log(error);      
        throw error
    }
}

async function makeComment(videoId, content) {
    // console.log(videoId,content);

    try {
        const response = await baseUrl.post(`/comments/${videoId}`, { content }, {
            withCredentials: true
        })

        // // console.log(response);
        return response
    } catch (error) {
        // console.log(error);
        throw error
    }
}

export {
    makeComment,
    getVideoComments
}