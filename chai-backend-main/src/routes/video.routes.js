import { Router } from 'express';
import {
    deleteVideo,
    getAllVideos,
    getAllVideosOfaUser,
    getSearchedVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
} from "../controllers/video.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();
// router.use(verifyJWT);
router
    .route("/")
    .get(getAllVideos)
    .post(
        verifyJWT,
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },

        ]),
        publishAVideo
    );

router.route("/getAllVideosOfaUser").get(verifyJWT,getAllVideosOfaUser)
router.route("/toggle/publish/:videoId").patch(verifyJWT,togglePublishStatus);

router.route("/searchVideos").get(getSearchedVideos)

router
    .route("/:videoId")
    .get(getVideoById)
    .delete(verifyJWT,deleteVideo)
    .patch(verifyJWT,upload.single("thumbnail"), updateVideo);

export default router