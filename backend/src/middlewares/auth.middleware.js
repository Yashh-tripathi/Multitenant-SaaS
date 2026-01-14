import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        let accessToken;

    // 1️⃣ Get token from cookies
    if (req.cookies?.accessToken) {
      accessToken = req.cookies.accessToken;
    }

    // 2️⃣ OR get token from Authorization header
    // else if (req.header("Authorization")) {
    //   accessToken = req.header("Authorization").replace("Bearer ", "");
    // }
        if(!accessToken){
            throw new ApiError(404, "access token not found");
        }
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if(!user){
            throw new ApiError(401, "Invalid user credentials")
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(400, error?.message || "Something went wrong verifying token");
    }
});