import mongoose from "mongoose";
import { JoinRequest } from "../models/joinRequest.model.js";
import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//create join request.
export const createJoinRequest = asyncHandler(async (req, res) => {
    const { orgId } = req.body;

    // 1️⃣ Validate orgId
    if (!orgId || !mongoose.Types.ObjectId.isValid(orgId)) {
      throw new ApiError(400, "Invalid organisation ID");
    }
  
    // 2️⃣ Check if already an approved member
    const membership = req.user.organisations.find(
      o => o.orgId.toString() === orgId
    );
  
    if (membership && membership.status === "approved") {
      throw new ApiError(400, "Already a member of this organisation");
    }
  
    // 3️⃣ Check pending join request IN DATABASE
    const pendingRequest = await JoinRequest.findOne({
      orgId,
      userId: req.user._id,
      status: "pending"
    });
  
    if (pendingRequest) {
      throw new ApiError(409, "Join request already sent");
    }
  
    // 4️⃣ CREATE join request
    const joinRequest = await JoinRequest.create({
      orgId,
      userId: req.user._id
    });
  
    return res.status(201).json(
      new ApiResponse(201, joinRequest, "Join request sent successfully")
    );
});


//get pending join request.
export const getPendingJoinRequest = asyncHandler(async (req, res) => {
    const {orgId} = req.params;
    const request = await JoinRequest.find({
        orgId,
        status: "pending"
    }).populate("userId", "name email");

    return res.status(200).json(new ApiResponse(200, request, "Pending join request fetched."));
});

//approve join request (admin)
export const approveJoinRequest = asyncHandler(async (req, res) => {
    const {requestId} = req.params;
    const joinRequest = await JoinRequest.findById(requestId);
    if(!joinRequest){
        throw new ApiError(404, "Api request not found.")
    }
    if(joinRequest.status !== "pending"){
        throw new ApiError(400, "Join request already processed.")
    }
    //update request
    joinRequest.status = "approved";
    await joinRequest.save();

    //add organisations to user 
    await User.findByIdAndUpdate(joinRequest.userId, {
        $push:{
            organisations: {
                orgId: joinRequest.orgId,
                role: "member",
                status: "approved"
            }
        }
    });
    return res.status(200).json(new ApiResponse(200, {}, "Join request approved"));
});

export const rejectJoinRequest = asyncHandler(async (req, res) => {
    const {requestId} = req.params;
    const joinRequest = await JoinRequest.findById(requestId);
    if(!joinRequest){
        throw new ApiError(404, "Join request not found.")
    }
    if(joinRequest.status !== "pending"){ throw new ApiError(400, "Join request already processed")}
    joinRequest.status = "rejected";
    await joinRequest.save();

    return res.status(200).json(new ApiResponse(200, {}, "Join request rejected"));
});



