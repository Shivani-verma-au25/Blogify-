import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './components/Login.jsx'
import Signin from './components/Signin.jsx'
import Allposts from './pages/Allposts.jsx'
import Addpost from './pages/Addpost.jsx'
import EditPost from './pages/EditPost.jsx'
import Layout from './components/layout/Layout.jsx'
import {Provider} from 'react-redux'
import { store } from './store/store.js'
import Post from './pages/Post.jsx'
import toast, { Toaster } from 'react-hot-toast';


const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children : [
      {
        path : '/',
        element : <Home />
      },
      {
        path : '/login',
        element :(
          <Layout authentication = {false}>
             <Login />
          </Layout>
        )
      },
      {
        path : '/signin',
        element : (
          <Layout authentication = {false} >
            <Signin />
          </Layout>
        )
      },
      {
        path : '/all-posts',
        element :(
          <Layout authentication={true}>
             <Allposts />
          </Layout>
        )
      },
      {
        path : '/Add-post',
        element :(
          <Layout authentication={true}>
             <Addpost />
          </Layout>
        )
      },
      {
        path : '/edit-post/:id',
        element : (
          <Layout authentication={true} >
            <EditPost />
          </Layout>
        )
      },
      {
        path : '/post/:id',
        element : (
          <Layout authentication={true} >
            <Post />
          </Layout>
        )
      },

    ]
  }
])
createRoot(document.getElementById('root')).render(
  
   <Provider store={store}>
    <GoogleOAuthProvider clientId='151203366151-jeu5dhurvl645c6h6eld2up4cose0l6k.apps.googleusercontent.com'>
      <RouterProvider router={router}/>
      </GoogleOAuthProvider>
       <Toaster />
   </Provider>
)
