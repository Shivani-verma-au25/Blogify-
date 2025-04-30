import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { userLogin } from "../services/axios.service";
import { login, logout } from "../store/authSlice";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

//   const loginSubmitform = async (data) => {
// 	console.log(data);
	
//     setError("");
//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/v1/user/login`,
//         data,
//         {
//           withCredentials: true,
//         }
//       );
//       const result = res.data;
//       console.log(result, "result");
//       if (result) {
//         dispatch(login({ result }));
//         navigate("/");
//       }
//     } catch (error) {
//       console.log(error.message);
//       setError(error.message);
//     }
//   };

const loginSubmitform = async (data) => {
  setError('');
  try {
    const resp = await axios.post(`http://localhost:5000/api/v1/user/login`,data , {withCredentials : true})
    console.log(resp.data.message,"datalogin");
    if (resp && resp.data) {
      dispatch(login(resp.data))
      toast.success(resp.data.message)
      navigate('/')
    }else{
      dispatch(logout())
      toast.error(resp.data.message)
      setError(resp.data.message)
    }
  } catch (error) {
    console.log(error,"form login");
      setError(error.message)
      toast.error(error?.response?.data?.message)

  }
}


  return (
    <div className="flex items-center justify-center w-full my-10">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span>
            {" "}
            <p>Logo</p>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signin"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}

        {/* form start */}

        <form onSubmit={handleSubmit(loginSubmitform)} className="my-10">
          <div className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your Email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <Button type="submit" btnText="Sign in" className="w-full"></Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
