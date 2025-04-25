import { configureStore } from "@reduxjs/toolkit";
import authREduce from './authSlice'

export const store = configureStore({
    reducer :{
        auth : authREduce
    }
})