import React from 'react'
import PostForm from '../components/PostForm'
import { useNavigate, useParams } from 'react-router-dom'

import Container from '../components/container/Container'

function Addpost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}
  

export default Addpost