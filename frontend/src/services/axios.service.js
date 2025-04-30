// services/authService.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/user";

export const getCurrentUser = async () => {
    const res = await axios.get(`${BASE_URL}/get-current`, {
      withCredentials: true,
    });
    return res; // user object
 
};


export const userRegister = async(data) => {
  const res = await axios.post(`${BASE_URL}/register`,data ,{withCredentials : true})
  return res;
}


export const userLogin = async(data) => {
    const res = await axios.post(`${BASE_URL}/login`,data,{
      withCredentials : true
    })
    return res; 

}



export const userLogOut = async () => {
      const res = await axios.post(`${BASE_URL}/logout`,{},{withCredentials : true})
      return res;
}


// get all posts

const POST_BASE_URL = 'http://localhost:5000/api/v1/post'

export const getAllPosts = async () => {
    const res = await axios.get(`${POST_BASE_URL}/all-posts` , {withCredentials : true})
    return res;
}