import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Container from '../components/container/Container';
import Button from '../components/Button';

function Post() {
  const { id } = useParams(); // post ID from URL
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const userID = userData?.userData?.data?.data?._id; //logged in user

  // ✅ Fetch single post by its ID
  const getPostById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/post/get-single-post/${id}`, {
        withCredentials: true,
      });

      if (res?.data?.data) {
        setPost(res.data.data);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
      navigate('/');
    }
  };

  const deletePost = async () => {
    try {
      await axios.post(`http://localhost:5000/api/v1/post/delete-users-post/${id}`);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPostById();
  }, [id]);

  if (!post) return <div className="text-center py-10">Loading...</div>;

  const isAuthor = post?.author?._id?.toString() === userID?.toString();

  return (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center gap-6 mb-4 relative border rounded-xl p-2">
          {Array.isArray(post.postImage) ? (
            post.postImage.map((imgUrl, index) => (
              <img key={index} src={imgUrl} className="rounded-xl w-48 h-auto object-cover" />
            ))
          ) : (
            <img src={post.postImage} alt={post.title} className="rounded-xl w-full" />
          )}
        </div>

        {isAuthor && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post._id}`}>
              <Button bgColor="bg-green-500" btnText="Edit" />
            </Link>
            <Button bgColor="bg-red-500" btnText="Delete" onClick={deletePost} />
          </div>
        )}

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{post.content}</div>
      </Container>
    </div>
  );
}

export default Post;















///////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Container from '../components/container/Container';
// import Button from '../components/Button';

// function Post() {
//   const { id } = useParams(); // id of the post from URL
//   const [post, setPost] = useState(null);
//   const navigate = useNavigate();

//   const userData = useSelector((state) => state.auth.userData);
//   const userID = userData?.userData?.data?.data?._id;

//   // ✅ Fetching all posts by this user
//   const getPostById = async () => {
//     if (!id || !userID) {
//       console.log("Post ID or user ID missing");
//       return;
//     }

//     try {
//       const res = await axios.get(`http://localhost:5000/api/v1/post/all-users-posts/${userID}`, {
//         withCredentials: true,
//       });

//       const posts = res?.data?.data || [];
//       const foundPost = posts.find((p) => p._id === id); // ✅ Match post by ID

//       if (foundPost) {
//         setPost(foundPost);
//       } else {
//         navigate('/'); // No post found with this ID
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const deletePost = async () => {
//     try {
//       const resp = await axios.post(`http://localhost:5000/api/v1/post/delete-users-post/${id}`);
//       console.log(resp.data, "delete post");
//       navigate('/');
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     getPostById();
//   }, [id]);

//   if (!post) return <div className="text-center py-10">Loading...</div>;

//   const isAuthor = post?.author?._id?.toString() === userID?.toString();

//   return (
//     <div className="py-8">
//       <Container>
//         <div className="w-full flex justify-center gap-6 mb-4 relative border rounded-xl p-2">
//           {Array.isArray(post.postImage) ? (
//             post.postImage.map((imgUrl, index) => (
//               <img key={index} src={imgUrl} className="rounded-xl w-48 h-auto object-cover" />
//             ))
//           ) : (
//             <img src={post.postImage} alt={post.title} className="rounded-xl w-full" />
//           )}
//         </div>

//         {isAuthor && (
//           <div className="absolute right-6 top-6">
//             <Link to={`/edit-post/${post._id}`}>
//               <Button bgColor="bg-green-500" btnText="Edit" />
//             </Link>
//             <Button bgColor="bg-red-500" btnText="Delete" onClick={deletePost} />
//           </div>
//         )}

//         <div className="w-full mb-6">
//           <h1 className="text-2xl font-bold">{post.title}</h1>
//         </div>
//         <div className="browser-css">{post.content}</div>
//       </Container>
//     </div>
//   );
// }

// export default Post;
