import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    approveJoinRequest,
    createJoinRequest, 
    getPendingJoinRequest,
    rejectJoinRequest
} from "../controllers/joinRequest.controller.js";
import { orgMiddleware, roleMiddleware } from "../middlewares/org.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, createJoinRequest);
router.route("/:orgId/pending").get(verifyJWT,orgMiddleware,roleMiddleware(["admin"]),getPendingJoinRequest);
router.route("/:requestId/approve").patch(verifyJWT, approveJoinRequest);
router.route("/:requestId/reject").patch(verifyJWT,rejectJoinRequest);


export default router;