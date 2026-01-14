import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createOrganisation, getMyOrganisation, getOrganisationByJoinCode } from "../controllers/organistaion.controller.js";


const router = Router();


router.route("/").post(verifyJWT, createOrganisation);
router.route("/my").get(verifyJWT, getMyOrganisation);
router.route("/code/:joinCode").get(getOrganisationByJoinCode);


export default router;