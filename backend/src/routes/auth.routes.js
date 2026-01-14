import { Router } from "express";
import { ChangePassword, getMe, Login, Logout, Register } from "../controllers/users.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").post(verifyJWT, Logout);
router.route("/change-password").post(verifyJWT, ChangePassword);
router.route("/me").get(verifyJWT, getMe);



export default router;