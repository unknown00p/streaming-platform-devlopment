import { Router } from "express";
import { SubscribeToApp } from "../controllers/appSubscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.use(verifyJWT)
router.route("/").post(SubscribeToApp)

export default router
