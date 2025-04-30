import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";

function Allposts() {
  const userdata = useSelector((state) => state.auth.userData.userData);
  console.log(userdata.data.data._id); // _id
  const userId = userdata.data.data._id;
  const [allPosts, setAllPosts] = useState([]);

  const getAllPostFromUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/post/all-users-posts/${userId}`,
        { withCredentials: true }
      );
      console.log(res.data.data ,"res");
      if (res?.data?.data) {
        setAllPosts(res.data?.data || []);
        toast.success(res.data?.message || "No posts found");
      } else {
        setAllPosts([]);
        toast.success("No posts found for this user.");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message || "No posts found");
    }
  };

  useEffect(() => {
    getAllPostFromUser();
  }, []);

  console.log(allPosts, "alpost here");

  return (
    <div className="w-full py-8">
      <Container>
        <div>
          {allPosts.length > 0 ? (
            allPosts.map((post) => (
              <div key={post._id}>
                <PostCard {...post} id={post._id}/>
              </div>
            ))
          ) : (
            <p>You have not created any post yet !</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Allposts;
