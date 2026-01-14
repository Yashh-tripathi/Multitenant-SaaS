import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { orgMiddleware, roleMiddleware } from "../middlewares/org.middleware.js";
import { addComment, getComments } from "../controllers/comment.controller.js";

const router = Router();

router.route("/:orgId/blogs/:blogId/comments").post(verifyJWT, orgMiddleware, roleMiddleware(["member"]), addComment);
router.route("/:orgId/blogs/:blogId/comments").get(verifyJWT, orgMiddleware, getComments);

export default router;