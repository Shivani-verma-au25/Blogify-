import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler( async (req ,_ ,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        // console.log("token ", token);
        
        if(!token) throw new ApiError(401, "Unauthorized User!")
    
         const decoded = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
        //  console.log("decodecd" , decoded);
         const user = await User.findById(decoded?._id).select("-password -refreshToken")
        
        if(!user) throw new ApiError(401 , 'Invalid Access Token')
        req.user = user 
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
        
    }
   
})