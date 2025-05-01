import React from 'react'
import {useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import RTE from '../components/RTE'
import axios from 'axios' 

function PostForm({post}) {
  const {id} =  useParams()
  const navigate = useNavigate()
  const usedata = useSelector((state) => state.auth.userData)
  const {register ,handleSubmit ,control ,getValues } = useForm({
    defaultValues :{
      title : post?.title || '',
      content : post?.content || '',
      // postImage : post?.postImage || ''
    }
  })

  const editPost = () => {}


  const submitHandlerPost = async (data) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    // Append image only if user selected it
    if (data.postImage && data.postImage[0]) {
      formData.append("postImage", data.postImage[0]);
    }

    let response;

    if (id) {
      // Update post
      response = await axios.post(
        `http://localhost:5000/api/v1/post/update-post/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("update post", response);
    } else {
      // Create new post
      response = await axios.post(
        `http://localhost:5000/api/v1/post/create-post`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("created post", response);
    }

    navigate("/");
  } catch (error) {
    console.log("Error saving post:", error.message);
  }
};

  
  return (
    <form onSubmit={handleSubmit(submitHandlerPost)}   className="flex flex-wrap" >
        <div className="w-2/3 px-2">
          <Input 
          label = "Title"
          placeholder = "Title"
          type = " text"
          className="mb-4"
          {...register('title' ,{required : true})}
           />
        </div>

        <RTE label="Content" name="content" control={control} defaultValue={getValues('content')}  />
        <div className="w-1/3 px-2">
            <Input 
            label = "File"
            type = "file"
            className="mb-4"
            enctype="multipart/form-data"
            {...register('postImage', {required : !post })}
            /> 

            { post && (
              <div className="w-full mb-4">
                <img src={post.postImage} alt="" className="rounded-lg"/>
              </div>
            )}

            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full bg-amber-600" btnText={post ? "Update" : "Submit"} ></Button>
        </div>
    </form>
  )
}


export default PostForm