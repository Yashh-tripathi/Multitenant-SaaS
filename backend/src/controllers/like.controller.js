import { Like } from "../models/likes.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// togle like
export const toggleLike = asyncHandler(async (req, res) => {
    const {blogId} = req.params;
    const existingLike = await Like.findOne({
        blogId,
        orgId: req.orgId,
        userId: req.user._id
    });
    if(existingLike){
        await existingLike.deleteOne();
        return res.status(200).json(new ApiResponse(200, {liked : false}, "Like removed"));
    }
    await Like.create({
        blogId,
        orgId: req.orgId,
        userId: req.user._id
    });
    return res
    .status(201)
    .json(new ApiResponse(201, { liked: true }, "Blog liked"));
});

//get like count
export const getLikeCount = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
  
    const count = await Like.countDocuments({
      blogId,
      orgId: req.orgId
    });
  
    return res
      .status(200)
      .json(new ApiResponse(200, { count }, "Like count fetched"));
  });
  