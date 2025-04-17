import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/user.model.js';
import { generateAccessTokenAndRefreshToken } from './user.controller.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuthLoginUser = asyncHandler(async (req, res) => {
    const { credential } = req.body;
    console.log("credential received:", credential);

    if (!credential) {
        throw new ApiError(400, "Google token missing!");
    }

    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload;

    if (!email) {
        throw new ApiError(400, "Google account info missing");
    }

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({
            fullName: name,
            email,
            password: sub // using sub as a placeholder
        });
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "Google login successful!"
            )
        );
});
