import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='151203366151-jeu5dhurvl645c6h6eld2up4cose0l6k.apps.googleusercontent.com'>
    <App />
  </GoogleOAuthProvider>,
)
