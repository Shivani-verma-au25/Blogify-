// services/authService.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/user";

export const getCurrentUser = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/get-current`, {
      withCredentials: true,
    });
    return res.data; // user object
  } catch (err) {
    return null; // token expired or user not logged in
  }
};
