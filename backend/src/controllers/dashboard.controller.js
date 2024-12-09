import mongoose from "mongoose"
import { Video } from "../models/video.model.js"
import { Subscription } from "../models/subscription.model.js"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

    // check if the Channel id is in the user database or not
    // lookup for channel videos and count the total views of videos
    const ChannelId = req.user._id

    const ChannelStats = await User.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(ChannelId) }
        },
        {
            $lookup: {
                from: "videos",
                localField: "_id",
                foreignField: "owner",
                as: "videos",
                pipeline: [
                    {
                        $lookup: {
                            from: "likes",
                            localField: "_id",
                            foreignField: "video",
                            as: "likesOfEachVideo"
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $project: {
                _id: 1,
                totalViews: {
                    $sum: {
                        $map: {
                            input: "$videos",
                            as: "video",
                            in: "$video.views"
                        }
                    },
                },
                subscriberCount: { $size: "$subscribers" },
                totalVideos: { $size: "$videos" },
                likesCount: { $size: "$videos.likesOfEachVideo" }
            },
        }
    ])


    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { ChannelStats },
            "Channel stats fetched successfully",
        ))

})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const ChannelId = req.user._id

    const videos = await Video.find({ owner: ChannelId })
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        { videos },
        "Videos fetched successfully",
    ))
})

export {
    getChannelStats,
    getChannelVideos
}