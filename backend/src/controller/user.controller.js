import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/apiError.js'
import {ApiResponse} from '../utils/apiResponse.js'
import User  from '../models/user.model.js'

export const checkRouter = asyncHandler(async( req , res) => {
    return res.status(200).json({
        message : 'ok'
    })
})


// generate accesstoken  or refreshToken 

export const generateAccessTokenAndRefreshToken = async (user_Id) =>{
    console.log("user_id" , user_Id);
    
    try {
        const user = await User.findById(user_Id)
        const accessToken = user.GenerateAccessToken()
        const refreshToken = user.GenerateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})

        // console.log("Access Token:", accessToken);
        // console.log("Refresh Token:", refreshToken);

        return {accessToken , refreshToken}
    } catch (error) {
        throw new ApiError(500 , "something went wrong whie generating tokens!")
    }
}

// register user
export const registerUser = asyncHandler( async ( req, res ) => {
    const {fullName ,email ,password} = req.body;

    if([
        fullName, email , password].some((field) => field?.trim() === '')
        ){ 
            throw new ApiError(400 , "All Fields are required !")
    }

    const existedUser = await User.findOne({
        $or : [{email} , {fullName}]
    })

    if (existedUser) throw new ApiError(400 , "User Already Exist!")

    const user = await User.create({
        fullName,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    

    if (!createdUser) {
        throw new ApiError(401 , "Something went wrong while registering user!")
    }

    return res.status(200).json( new ApiResponse( 200 ,  "User create successfully !",createdUser ))

})

// login user

export const loginUser = asyncHandler( async ( req,res) => {
    const {email ,password} = req.body;
    // console.log("login user" , email , password);
    

    if (!email && !password ) {
        throw new ApiError(400 , "Email and password are required!")
    }

    const user = await User.findOne({
        $or : [{email}]
    })

    if(!user) throw new ApiError(404 , "User not found! ")


    const isMatchPass = await user.isPasswordCorrect(password)

    if (!isMatchPass){
        throw new ApiError(401 , "your password is not correct !")
    }

    const {accessToken , refreshToken} = await generateAccessTokenAndRefreshToken(user._id) 
    console.log("accessToken  " ,accessToken);
    console.log("refreshToken  " ,refreshToken);
    

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    }

    return res.status(200)
    .cookie('accessToken' , accessToken , options)
    .cookie('refreshToken' , refreshToken , options)
    .json(
        new ApiResponse(200 ,
         "User Logged in succeessfully!",
            {
                user : loggedInUser, accessToken , refreshToken
            },

         ))
}) 

export const getCurrentUSer = asyncHandler( async ( req, res) => {
    try {
        const user = await User.findById( req?.user._id).select("-password")
        if (!user) {
            throw new ApiError(401 , "User not found !")
        }
        
        return res.status(200)
        .json( new ApiResponse(200 , "User found" , user))
    } catch (error) {
        throw new ApiError( 400 , error?.message || error)
        console.log(error);
        
    }
})


// user Loggout

export const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id, 
        {
            $unset : {
                refreshToken : 1
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res.status(200)
    .clearCookie("accessToken" , options)
    .clearCookie("refreshToken" , options)
    .json(new ApiResponse(200 , "User Logged out successfully !",{}  ))
})