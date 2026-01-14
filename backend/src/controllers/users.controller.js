import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const Register = asyncHandler(async (req, res) => {
    const {name , email, password } = req.body;
    if(!name || !email || !password){
        throw new ApiError(400, "All fields are required");
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new ApiError(409, "User already exists");
    }
    const user = await User.create({
        name: name?.toString().trim(),
        email: email?.toString().trim(),
        password
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export const Login = asyncHandler(async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json(new ApiResponse(400, {}, "All feilds are required"));
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }
    const passwordValidity = await user.isPasswordCorrect(password);
    if(!passwordValidity){
        throw new ApiError(401, "Invalid Password");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.refreshToken;

    const options = {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200,{ 
            user: safeUser,
            accessToken
        }, "Login succesfull")
    )
});

export const Logout = asyncHandler(async (req,res) => {
    await User.findOneAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 }
        },{
            new: true
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken", {
        httpOnly: true,
        secure: true
    })
    .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true
    })
    .json(new ApiResponse(200, {}, "Logged out successfully"))
});

export const ChangePassword = asyncHandler(async (req,res) => {
    const { oldPassword, newPassword } = req.body;
    if(!oldPassword || !newPassword){ throw new ApiError(400, "All feilds are required for cahnging password")}
    const user = await User.findById(req.user._id);
    const passwordValidity = await user.isPasswordCorrect(password);
    if(!passwordValidity){
        throw new ApiError(401, "Invalid Password");
    }
    user.password = password;
    await user.save(
        {validateBeforeSave: false}
    );

    return res
    .status(200)
    .json(new ApiResponse(200, {} , "Password changed successfully"));
});

export const getMe = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if(!user){ throw new ApiError("User not found") }
    return res.status(200).json( new ApiResponse(200, user, "fetched user"));
});
