import { Organisation } from "../models/organisations.model.js";
import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from 'crypto'

export const createOrganisation = asyncHandler(async (req, res) => {
    const {name} = req.body;
    if(!name){ throw new ApiError(400, "Organisation name is required")}
    //joincode 
    const joinCode = crypto.randomBytes(4).toString('hex').toUpperCase();

    const organisation = await Organisation.create({
        name: name.trim(),
        joinCode,
        createdBy: req.user._id
    });

    //adding org to user ki id
    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            organisations: {
                orgId: organisation._id,
                role: "admin",
                status: "approved"
            }
        }
    });

    const updatedUser = await User.findById(req.user._id).select(
        "-password -refreshToken"
      );
    return res
    .status(201)
    .json(
        new ApiResponse(201, {
            organisation,
            user: updatedUser
        }, "Organisation created successfully")
    );
});

export const getMyOrganisation = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate("organisations.orgId", "name joinCode createdAt").select("organisations");
    if(!user){ throw new ApiError(404, "User not found") }
    return res.status(200).json(new ApiResponse(200, user.organisations, "Organisation fetched"))
});

export const getOrganisationByJoinCode = asyncHandler(async (req, res) => {
    const {joinCode} = req.params;
    const organisation = await Organisation.findOne({ joinCode });
    if(!organisation){ throw new ApiError(404, "Invalid join code") }
    return res.status(200).json(new ApiResponse(200, organisation, "Organisation found"));
});

