import { Comment } from "../models/comments.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//add comment
export const addComment = asyncHandler(async (req, res) => {
    const {text} = req.body;
    const {blogId} = req.params;
    if(!text){
        throw new ApiError(400,"No comment")
    }
    const comment = await Comment.create({
        blogId,
        orgId: req.orgId,
        userId: req.user._id,
        text: text.trim()
    });
    return res.status(201).json(new ApiResponse(201, comment, "Commented on the post"));
});

//get comments of a blog 
export const getComments = asyncHandler(async (req, res) => {
    const {blogId} = req.params;
    const comments = await Comment.find({
        blogId,
        orgId: req.orgId
    }).populate("userId", "name").sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, comments, "Comments fetched"));
});