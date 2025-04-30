import axios from "axios";
// import { useNavigate } from "react-router-dom";

const useLogout = () => {
  // const navigate = useNavigate();

  const logout = async () => {
    try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/auth/logout",
      {},
      {
        withCredentials: true, // This is crucial if using cookies
      }
    );
    console.log("✅ Logged out", res.data);
  } catch (error) {
    console.error("❌ Logout failed:", error);
  }
  };

  return logout;
};

export default useLogout;
