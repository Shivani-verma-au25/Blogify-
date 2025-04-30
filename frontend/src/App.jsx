import React, { use, useEffect, useState } from "react";
import GoogleAuthLogin from "./components/GoogleAuthLogin";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useDispatch } from "react-redux";
import axios from "axios";
import {login,logout} from './store/authSlice'
import { Outlet } from "react-router-dom";
import { getCurrentUser } from "./services/axios.service";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser()
    .then((userData) =>{
      if(userData){
        console.log("userdata" , userData);
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => {
      setLoading(false)
    })
  } ,[])

 

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
  // <div><GoogleAuthLogin/></div>
}

export default App;
