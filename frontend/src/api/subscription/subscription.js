import baseUrl from "../baseUrl/BaseUrl";

async function toggleSubscription(channelId) {
    try {
        const response = baseUrl.post(`/subscriptions/c/${channelId}`, {}, {
            params: { channelId },
            withCredentials: true,
        })

        return response
    } catch (error) {
        // console.log(error)
    }
}

async function isChannelSubscribed(channelId) {
    try {
        const response = await baseUrl.get(`/subscriptions/c/getIsChannelSubscribed/${channelId}`, {
            withCredentials: true
        })

        return response
    } catch (error) {
        // console.log(error)
    }
}

async function getSubscribersOfchannel(channelId) {
    try {
        const response = await baseUrl.get(`/subscriptions/c/${channelId}`)

        return response
    } catch (error) {
        // console.log(error)
    }
}

export {
    toggleSubscription,
    isChannelSubscribed,
    getSubscribersOfchannel
}