import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/apiError.js'
import {ApiResponse} from '../utils/apiResponse.js'
import Posts from '../models/posts.model.js';

export const createPost = asyncHandler( async (req , res ) => {
    const {title, content ,postImage ,} = req.body;

    if (!title && !content) {
        throw new ApiError( 400 , "Title and content are required!")
    }

    const post = await Posts.create({
        title,
        content,
        postImage,
        author : req.user._id       
    })

    if (!post) {
        throw new ApiError(401 , "Post not created ! try again")
    }

    return res.status(200)
    .json( new ApiResponse(
        200,
        "Post created !",
        post,
    ))
})