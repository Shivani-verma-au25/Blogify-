import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/apiError.js'
import {ApiResponse} from '../utils/apiResponse.js'
import Posts from '../models/posts.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const createPost = asyncHandler( async (req , res ) => {
    const {title, content} = req.body;

    if (!title && !content) {
        throw new ApiError( 400 , "Title and content are required!")
    }

    // console.log(req.files ,"files");
    
    // let postImageLocalpath;

    // if (req.files && Array.isArray(req.files.postImage) && req.files.postImage.length > 0) {
    //     postImageLocalpath = req.files.postImage[0]?.path
    // }
    // console.log(postImageLocalpath);
    
    
    // const postImage = await uploadOnCloudinary(postImageLocalpath)



    let postImageLocalpath = [];

    if (req.files && Array.isArray(req.files.postImage)) {
        for (const file of req.files.postImage){
            const localPath = file.path;
            const uploadImage = await uploadOnCloudinary(localPath)

            if(uploadImage?.url){
                postImageLocalpath.push(uploadImage.url)
            }
        }
    }

    const post = await Posts.create({
        title,
        content,
        postImage : postImageLocalpath || "",
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

export const getAllPosts = asyncHandler( async (req ,res) =>{
    const allPosts = await Posts.find()
    // console.log("all posts" ,allPosts);

    return res.status(200)
    .json( new ApiResponse( 200 ,"All posts are here" , allPosts))
})

export const updatePost = asyncHandler( async (req ,res ) => {
    const {id} = req.params;
    const {title ,content } = req.body;

    if (!title || !content) {
        throw new ApiError(400 , "All fields are required!")
    }

    let postImages = [];

    if (req.files && Array.isArray(req.files.postImage)) {
        for (const file of req.files.postImage) {
            const uploadedImage = await uploadOnCloudinary(file.path);
            if (uploadedImage?.url) {
                postImages.push(uploadedImage.url);
            }
        }
    }


    const updatedPost = await Posts.findByIdAndUpdate(
        id ,
        {
            $set : {
                title ,
                content ,
                ...(postImages.length > 0 && { postImage: postImages }) 
            }

        },
        {
            new : true
        }
    )

    if (!updatedPost) {
        throw new ApiError(401 , "Post not created !")
    }

    return res.status(201)
    .json( new ApiResponse( 201 , "Post updated !" , updatedPost))
})