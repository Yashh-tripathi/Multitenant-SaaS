import { Blog } from "../models/blogs.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//create blog
export const createBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    if(!title || !content) {
        throw new ApiError(403, "Title and content both are required")
    }
    const blog = await Blog.create({
        orgId: req.orgId,
        title: title.trim(),
        content,
        createdBy: req.user._id
    });
    return res.status(201).json(new ApiResponse(201, blog, "Blog created"))
});

//get blog
export const getBlogsOrg = asyncHandler(async (req, res) => {
    const {orgId} = req.params;
    const blogs = await Blog.find({orgId} ).populate("createdBy", "name").sort({ createdAt: -1});
    return res
    .status(200)
    .json(new ApiResponse(200, blogs, "Blogs fetched successfully"));
});

//get single blog
export const getSingleBlog = asyncHandler(async (req, res) => {
    const {blogId} = req.params;
    const blog = await Blog.findOne({
        _id: blogId,
        orgId: req.orgId
    }).populate("createdBy", "name");
    if(!blog){
        throw new ApiError(404, "Blog not found")
    }

    return res.status(200).json(new ApiResponse(200, blog, "Blog fetched"));
});

//delete blog
export const deleteBlog = asyncHandler(async (req, res) => {
    const {blogId} = req.params;
    const blog = await Blog.findByIdAndDelete({
        _id: blogId,
        orgId: req.orgId
    });
});

