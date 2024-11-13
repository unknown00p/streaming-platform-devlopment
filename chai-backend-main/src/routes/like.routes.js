import { Router } from 'express';
import {
    getLikedVideos,
    toggleCommentLike,
    toggleVideoLike,
    toggleTweetLike,
    getLikesOfaVideo,
    getLikesOfComment
} from "../controllers/like.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/toggle/v/:videoId").post(verifyJWT,toggleVideoLike);
router.route("/toggle/c/:commentId").post(verifyJWT,toggleCommentLike);
router.route("/toggle/t/:tweetId").post(verifyJWT,toggleTweetLike);
router.route("/videos").get(verifyJWT,getLikedVideos);
router.route("/videoLikes/:videoId").get(getLikesOfaVideo)
router.route("/commentLikes/:commentId").get(getLikesOfComment)

export default router