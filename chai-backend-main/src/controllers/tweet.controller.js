import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { text } from "express"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet

    // steps to Make tweet controler
    // 1: get the todo content from frontend
    console.log("user: ", req.user?._id);
    const { content } = req.body

    // 2: check if i got the content correctly
    if (!content) {
        throw new ApiError(404,
            "Please pass the content for tweet"
        )
    }

    // 3: add tweet to database
    const tweet = await Tweet.create([
        {
            content: content,
            owner: new mongoose.Types.ObjectId(req.user?._id)
        }
    ])
    if (!tweet) {
        throw new ApiError(500,
            "failed to create tweet"
        )
    }

    // 4: return a responce
    return res
        .status(200)
        .json(
            new ApiResponse(200,
                {
                    tweet
                },
                "tweet created successfully"
            )
        )
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    // get the userId params from frontend
    // check if you are getting the userId correct
    // find the tweets that matches the userId
    // send the res array of tweets

    const { userId } = req.params
    console.log(userId);

    if (!userId) {
        throw new ApiError(404, "userId is undefined")
    }

    const tweetsOfUser = await Tweet.find({ owner: new mongoose.Types.ObjectId(userId) })

    if (!tweetsOfUser?.length) {
        throw new ApiError(404,"no tweets founded")
    }

    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            tweetsOfUser,
            "tweets fetched successfully"
        )
    )

})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    // get tweetId from frontend
    // check if the id is correct or not
    // find the id in database and update it
    // sent the updated responec

    const {tweetId} = req.params
    const {content} = req.body

    if (!tweetId) {
        throw new ApiError(400,"Id is required")
    }
    if (!content) {
        throw new ApiError(400,"content is required")
    }

    const updatedTweet = await Tweet.findByIdAndUpdate(tweetId,{
        content: content
    })

    console.log(updatedTweet);

    return res
    .status(200)
    .json(
        new ApiResponse(200,updatedTweet,"tweet got updated successfully")
    )

})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    // get the tweet id
    // check if id is correct or not
    // find the tweet by id and delete it
    // send the deletion message

    const {tweetId} = req.params

    if (!tweetId) {
        throw new ApiError(400,"tweetId is required")
    }

    const tweetDeleted = await Tweet.findByIdAndDelete(tweetId)

    if (!tweetDeleted) {
        throw new ApiError(500,"deletion method got failed")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"tweet deleted successfully")
    )

})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
