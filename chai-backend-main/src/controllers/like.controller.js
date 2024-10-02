import mongoose, { isValidObjectId } from "mongoose"
import { Like } from "../models/like.model.js"
import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const userId = req.user._id
    //TODO: toggle like on video

    if (!(videoId && userId)) {
        throw new ApiError(
            400,
            "Video and user ID is required",
        )
    }

    const likedVideo = await Like.findOne({ video: videoId, likedBy: userId })

    if (!likedVideo) {
        const likevideo = await Like.create({
            likedBy: userId,
            video: videoId,
        })

        if (!likevideo) {
            throw new ApiError(
                400,
                "Failed to create like",
            )
        }

        return res
            .status(200)
            .json(new ApiResponse(
                200,
                { likevideo },
                "Video liked successfully",
            ))

    } else {
        // console.log("nahi aa rha hai");
        const UpdateLikeVideo = await Like.deleteOne({ video: videoId, user: userId })

        if (!UpdateLikeVideo) {
            throw new ApiError(
                400,
                "Failed to delete like",
            )
        }

        return res
            .status(200)
            .json(new ApiResponse(
                200,
                {},
                "Video deleted successfully",
            ))
    }

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    const userId = req.user._id

    //TODO: toggle like on comment

    if (!(commentId && userId)) {
        throw new ApiError(
            400,
            "Comment Id and user Id is required",
        )
    }

    const likedComment = await Like.findOne({ comment: commentId, likedBy: userId })
    // console.log(likedComment);


    if (!likedComment) {

        const LikeComment = await Like.create({
            likedBy: userId,
            comment: commentId,
        })

        if (!LikeComment) {
            throw new ApiError(
                400,
                "Failed to create like",
            )
        }

        return res
            .status(200)
            .json(new ApiResponse(
                200,
                { LikeComment },
                "Comment liked successfully",
            ))

    } else {
        const removeLike = await Like.findOneAndDelete({ comment: commentId, likedBy: userId })

        if (!removeLike) {
            throw new ApiError(
                400,
                "Failed to remove like",
            )
        }

        return res
            .status(200)
            .json(new ApiResponse(
                200,
                {},
                "Comment unliked successfully",
            ))
    }



})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    const userId = req.user._id
    //TODO: toggle like on tweet

    if (!(tweetId && userId)) {
        throw new ApiError(
            400,
            "tweet id and user id is required"
        )
    }

    const likedTweet = await Like.findOne({ tweet: tweetId, likedBy: userId })

    if (!likedTweet) {
        const likeTweet = await Like.create({
            tweet: tweetId,
            likedBy: userId
        })

        if (!likeTweet) {
            throw new ApiError(
                400,
                "Failed to like tweet",
            )
        }

        return res
            .status(200)
            .json(new ApiResponse(
                200,
                { likeTweet },
                "Tweet liked successfully",
            ))
    } else {
        const unlikeTweet = await Like.findOneAndDelete({ tweet: tweetId, likedBy: userId })

        if (!unlikeTweet) {
            throw new ApiError(
                400,
                "Failed to unlike tweet",
            )
        }

        return res
            .status(200)
            .json(new ApiResponse(
                200,
                {},
                "Tweet unliked successfully",
            ))
    }
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos of user
    const userId = req.user._id
    // // console.log(userId);


    if (!userId) {
        throw new ApiError(
            401,
            "Unauthorized",
        )
    }

    const getAllLikedVideos = await Like.aggregate([
        {
            $match: { likedBy: new mongoose.Types.ObjectId(userId) }
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "videos"
            }
        },
        {
            $unwind: "$videos"
        },
        {
            $project: {
                _id: 1,
                "videos._id": 1,
                "videos.thumbnail": 1,
                "videos.title": 1,
                "videos.duration": 1,
                "videos.views": 1,
                "videos.createdAt": 1,
            }
        }
    ])

    // console.log(getAllLikedVideos);


})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}