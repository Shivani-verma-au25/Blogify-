import React from 'react'
import {Link} from 'react-router-dom'


function PostCard({id ,title ,postImage}) {
    
  return (
    <Link to={`/post/${id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4 mb-10'>
        <div className='w-full justify-center mb-4'> 
          <img src={postImage[0]} alt="post image"  className='rounded-xl'/>
          {/* { postImage && postImage.map((image) =>{
            <img src={image} alt="post image" />
          }) } */}

        </div>
        <div>
          <h2 className='text-xl font-bold'>{title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard