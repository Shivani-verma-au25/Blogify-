import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Posts from "../models/posts.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import User from "../models/user.model.js";

// create post
export const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title && !content) {
    throw new ApiError(400, "Title and content are required!");
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
    for (const file of req.files.postImage) {
      const localPath = file.path;
      const uploadImage = await uploadOnCloudinary(localPath);

      if (uploadImage?.url) {
        postImageLocalpath.push(uploadImage.url);
      }
    }
  }

  const post = await Posts.create({
    title,
    content,
    postImage: postImageLocalpath || "",
    author: req.user._id,
  });

  if (!post) {
    throw new ApiError(401, "Post not created ! try again");
  }

  return res.status(200).json(new ApiResponse(200, "Post created !", post));
});

// get all posts
export const getAllPosts = asyncHandler(async (req, res) => {
  const allPosts = await Posts.find();
  // console.log("all posts" ,allPosts);

  return res
    .status(200)
    .json(new ApiResponse(200, "All posts are here", allPosts));
});

// update post
export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    throw new ApiError(400, "All fields are required!");
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
    id,
    {
      $set: {
        title,
        content,
        ...(postImages.length > 0 && { postImage: postImages }),
      },
    },
    {
      new: true,
    }
  );

  if (!updatedPost) {
    throw new ApiError(401, "Post not created !");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Post updated !", updatedPost));
});

// get all post from user create

export const getPostfromUserCreate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //   console.log(req.user._id ); user's id
  //   console.log(id );

  if (req.user._id.toString() !== id.toString()) {
    throw new ApiError(403, "You are not authorized to view these posts");
  }

  if (!id) {
    throw new ApiError(400, "User ID is required");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  // const allposts = []
  // 🔥 Get all posts created by this user
  const posts = await Posts.find({ author: id }).populate(
    "author",
    "fullName email"
  );

  if (!posts && posts.length === 0) {
    throw new ApiError(404, "No posts found for this user");
  }

  //   allposts.push(posts)

  return res.status(200).json(
    new ApiResponse(
      200,
      posts.length > 0
        ? "All posts created by the user"
        : "No posts found for this user",
      posts || []
      //   allposts || []
    )
  );
});

// delete posts

export const deletePost = asyncHandler(async (req, res) => {
  //first want user login
  // want post id which is gonna delete

  const { id } = req.params; // post id
  const userId = req.user._id;
  if (!id) {
    throw new ApiError(404, "Id required !");
  }

  const deletePost = await Posts.findByIdAndDelete({
    _id: id,
    createdBy: userId,
  });

  if (!deletePost) {
    throw new ApiError(
      403,
      "You are not authorized to delete this post or it doesn't exist."
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Post deleted successfully"));
});


// get single post by thier id

export const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Posts.findById(id).populate(
      "author",
      "_id fullName email"
    ); // populate author details

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// editPost
export const EditPost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // post id
    const userId = req.user._id;

    const { title, content, postImage } = req.body;

    if ([title, content].some((field) => field.trim() === "")) {
      throw new ApiError(400, " All feids are required");
    }

    if (!id) {
      throw new ApiError(400, "Post ID is required.");
    }

    const editPost = await Posts.findOneAndUpdate(
      { _id: id, userId },
      {
        $set: {
          title,
          content,
          postImage,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!editPost) {
      throw new ApiError(
        403,
        "You are not authorized to edit this post or post doesn't exist."
      );
    }

    return res.status(200).json(new ApiResponse(200, "Post edit", editPost));
  } catch (error) {
    console.error("🔥 Edit Post Error:", error);
    throw new ApiError(500, error.message || "server is crashing");
  }
});
