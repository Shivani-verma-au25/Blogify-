import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout({children , authentication = true}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  console.log("authStatus", authStatus);

  useEffect(() => {
    // false                  false       false  = false
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    }
    // false               false           false
    if (authentication && authStatus !== authentication) {
      navigate("/");
    }

    if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoading(false)
  },[authentication , authStatus , navigate]);

  return  loading ? <h1>Loading ...</h1> : <>{children}</>
}

export default Layout;
