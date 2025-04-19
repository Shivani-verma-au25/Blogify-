import dotenv from 'dotenv'
import express from 'express'
import Cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()

app.use(Cors({
  origin: 'http://localhost:5173', // your frontend port
  credentials: true
}));
app.use(express.json({limit : '16kb'}))
app.use(express.urlencoded({extended : true , limit : '16kb'}))
app.use(cookieParser())
app.use(express.static('public'))


import userRouter from './src/routers/user.router.js'
import googleRouter from "./src/routers/google.router.js"
import postRouter from './src/routers/post.route.js'

// app.use('/api/v1/check', userRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/auth', googleRouter)
app.use('/api/v1/post', postRouter)




// Error-handling middleware should be **after** all routes
import { ApiError } from './src/utils/apiError.js'
app.use((err, req, res, next) => {
    // console.error("Error caught:", err); // Debugging log

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    }

    // Handle unexpected errors
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});

export {app}