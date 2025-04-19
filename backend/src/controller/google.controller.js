import axios from 'axios';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import {generateAccessTokenAndRefreshToken} from '../controller/user.controller.js'
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
dotenv.config();

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

console.log(process.env.GOOGLE_CLIENT_ID); // Make sure it's not undefined


export const googleAuthLoginUser = asyncHandler( async (req, res) => {
  const { idToken } = req.body;
  console.log("token from google" ,idToken);
  
  if (!idToken) return res.status(400).json({ error: "Missing ID Token" });

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: client.clientId,
    });
    const payload = ticket.getPayload();
    const {email , name } = payload; // picture when update the db ist pending
    
    // Optional: create/find user in DB
    let user = await User.findById(email._id)
    if (!user) {
        user = await User.create({
        fullName : name,
        email,
        isGoogleUser: true, 
      })
    }

    const {accessToken , refreshToken} = await generateAccessTokenAndRefreshToken(user._id)
    console.log("✅ Verified Google user:", payload);

    const loggedinUser = await User.findById(user._id).select("-password -refreshToken")

    if (!loggedinUser) {
      throw new ApiError(400 , "Login failed !")
    } 

    const options = {
      httpOnly : true,
      secure : true
    }

    return res.status(200)
    .cookie("accessToken" ,accessToken , options)
    .cookie("refreshToken" ,refreshToken , options)
    .json( new ApiResponse(200 , 
      "User logged in successfully !",
      {
        user : loggedinUser , accessToken , refreshToken
      }
    ))

  } catch (err) {
    console.error("❌ ID token verification failed", err);
    res.status(400).json({ error: "Invalid ID Token" });
  }
})