import baseUrl from "../baseUrl/BaseUrl";

async function deleteVideo(videoId) {
    try {
        const response = await baseUrl.delete(`/videos/${videoId}`,
            {
                withCredentials: true
            }
        )

        // console.log(response);
        return response
    } catch (error) {
        // console.log(error);
    }
}

async function getAllVideosOfaUser(userId, page = 1, limit = 10, sortBy = 'isPublished', sortType = 'ascending') {
    try {
        if (userId) {

            const response = await baseUrl.get("/videos/getAllVideosOfaUser", {
                params: {
                    userId,
                    page,
                    limit,
                    sortType,
                    sortBy
                },
                withCredentials: true
            })
            return response
        }

    } catch (error) {
        // console.log(error);
    }
}

async function getVideobyId(videoId) {
    try {
        const response = await baseUrl.get(`/videos/${videoId}`, {
            params: {
                videoId
            },
            withCredentials: true
        })
        // console.log(response);
        return response
    } catch (error) {
        console.log(error);
    }
}

async function updateVideo({ videoId, title, description, thumbnail }) {
    try {
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("thumbnail", thumbnail)
        const response = await baseUrl.patch(`/videos/${videoId}`, formData, {
            params: videoId,
            withCredentials: true
        })
        // console.log(response);
        return response
    } catch (error) {
        // console.log(error);
    }
}

async function togglePublicStatus({ videoId }) {
    try {
        const response = await baseUrl.patch(`/videos/toggle/publish/${videoId}`, {
            videoId
        }, { withCredentials: true })

        // console.log(response);
        return response

    } catch (error) {
        // console.log(error);
    }
}

async function postVideo(title, description, videoFile, thumbnail) {
    let formData = new FormData()
    formData.append("videoFile", videoFile)
    formData.append("thumbnail", thumbnail)
    formData.append("title", title)
    formData.append('description', description)

    try {
        const response = await baseUrl.post("/videos", formData, {
            withCredentials: true
        })
        // console.log(response);
        return response
    } catch (error) {
        // console.log(error);
    }
}

async function getAllSearchVideos(page = 1, limit = 2, sortBy = 'isPublished', query = "ajab") {
    let queryToLower = query.toLowerCase()

    try {
        return await baseUrl.get("/videos", {
            params: {
                page,
                limit,
                sortBy,
                query: queryToLower
            },
            withCredentials: true
        })
    } catch (error) {
        // console.log(error);                
    }
}

async function getAllVideos(page = 1, limit = 10) {
    try {
        return await baseUrl.get("/videos", {
            params: {
                page,
                limit,
            },
            withCredentials: true
        })
    } catch (error) {
        // console.log(error);                
    }
}

export {
    deleteVideo,
    getAllVideosOfaUser,
    getVideobyId,
    updateVideo,
    togglePublicStatus,
    postVideo,
    getAllVideos,
    getAllSearchVideos
}