import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { userLogOut } from '../services/axios.service'; 
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await userLogOut(); // call backend logout API
      console.log(response.data.message); // "User Logged out successfully!"
      
      dispatch(logout()); // redux state clear
      toast.success(response?.data?.message)
      navigate('/'); // redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-gray-500 cursor-pointer"
    >
      Log Out
    </button>
  );
}

export default LogoutButton;
