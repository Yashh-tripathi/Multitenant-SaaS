import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { orgMiddleware, roleMiddleware } from "../middlewares/org.middleware.js";
import { createBlog, deleteBlog, getBlogsOrg, getSingleBlog } from "../controllers/blog.controller.js";

const router = Router();

router.route("/:orgId/blogs").post(verifyJWT,orgMiddleware,roleMiddleware(["admin"]),createBlog);
router.route("/:orgId/blogs").get(verifyJWT,orgMiddleware,getBlogsOrg);
router.route("/:orgId/blogs/:blogId").get(verifyJWT,orgMiddleware,getSingleBlog);
router.route("/:orgId/blogs/:blogId").delete(verifyJWT,orgMiddleware,roleMiddleware(["admin"]),deleteBlog);

export default router;