import React, { useEffect, useState } from "react";
import { getAllPosts } from "../services/axios.service";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((posts) => {
      // console.log(posts.data.data , "posts");
      
      // dispatch action here
      if (posts && posts.data) {
        setPosts(posts.data.data);
      }
    });
  }, []);

  console.log(posts,"outer");
  

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((singlePost) => (
            <div key={singlePost._id}  className="p-2 w-1/4">
              <PostCard  {...singlePost} id={singlePost._id}/>
            </div>
          ) )}
          {/* {posts.map((post) => (
            <div key={post.id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))} */}
        </div>
      </Container>
    </div>
  );
}

export default Home;
