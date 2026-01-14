import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { orgMiddleware, roleMiddleware } from "../middlewares/org.middleware.js";
import { getLikeCount, toggleLike } from "../controllers/like.controller.js";

const router = Router();

router.route("/:orgId/blogs/:blogId/like").post(verifyJWT,orgMiddleware,roleMiddleware(["member"]),toggleLike);
router.route("/:orgId/blogs/:blogId/likes").get(verifyJWT,orgMiddleware,getLikeCount);

export default router;