import mongoose from "mongoose";
import { AppSubscription } from "../models/appSubscription.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const SubscribeToApp = asyncHandler(async (req, res) => {
        const userId = req.user._id        

        if (!userId) {
            throw new ApiError(
                404,
                "Unauthorized",
            )
        }

        const createSubscription = await AppSubscription.create({
            userId: userId,
        })

        if (!createSubscription) {
            throw new ApiError(
                404,
                "Failed to subscribe to app",
            )
        }

        return res
            .status(201)
            .json(new ApiResponse(200, { createSubscription }, "Subscription created successfully"))

})

export {
    SubscribeToApp
}