import mongoose from "mongoose"
import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query

    if (!videoId) {
        throw new ApiError(
            400,
            "Video ID is required",
        )
    }

    const retrivedVideoComments = await Comment.aggregate([
        {
            $match: {video: new mongoose.Types.ObjectId(videoId)}
        },
        {
            $lookup:{
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "videoDetails"
            }
        },
        {
            $lookup:{
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "userDetails"
            }            
        },
        {
            $unwind: "$userDetails"
        },
        {
            $project:{
                _id: 1,
                content: 1,
                video: 1,
                createdAt: 1,
                updatedAt: 1,
                "userDetails._id":1,
                "userDetails.username":1,
                "userDetails.avatar":1,
            }
        }
    ])


    if (!retrivedVideoComments) {
        throw new ApiError(
            404,
            "Comments not found",
        )
    }

    res
    .status(200)
    .json(new ApiResponse(200, {retrivedVideoComments}, "Comments retrieved successfully"))

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const { videoId } = req.params
    const { content } = req.body
    const userId = req.user._id

    if (!(videoId && userId)) {
        throw new ApiError(
            400,
            "Video ID and User ID are required",
        )
    }

    const addComment = await Comment.create({
        video: videoId,
        owner: userId,
        content: content,
    })

    if (!addComment) {
        throw new ApiError(
            400,
            "Failed to add comment",
        )
    }

    res
        .status(201)
        .json(new ApiResponse(
            201,
            { addComment },
            "Comment added successfully",
        ))

})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const { commentId } = req.params
    const { content } = req.body

    if (!(commentId && content)) {
        throw new ApiError(
            400,
            "Comment ID and Content are required",
        )
    }

    const updateComment = await Comment.findByIdAndUpdate(commentId, {
        content: content
    }, { new: true })

    if (!updateComment) {
        throw new ApiError(
            400,
            "Failed to update comment",
        )
    }

    res
        .status(200)
        .json(new ApiResponse(
            200,
            { updateComment },
            "Comment updated successfully",
        ))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const { commentId } = req.params

    if (!commentId) {
        throw new ApiError(
            400,
            "Comment ID is required",
        )
    }

    const deleteComment = await Comment.findByIdAndDelete(commentId)

    if (!deleteComment) {
        throw new ApiError(
            400,
            "Failed to delete comment",
        )
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "Comment deleted successfully",
    ))
})

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}
