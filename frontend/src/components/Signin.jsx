import React, { useState } from 'react'
import Input from './Input'
import {useForm} from 'react-hook-form'
import Button from './Button'
import {Link, useNavigate} from 'react-router-dom'
import { userRegister } from '../services/axios.service'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios'

function Signin() {
  const [error ,setError] = useState('')
  const {register ,handleSubmit} = useForm()
  const navigate = useNavigate()
 
  const signinSubmitHandle = async (data) =>{
  setError('')
  try {
    const resp = await axios.post(`http://localhost:5000/api/v1/user/register`, data, {
      withCredentials: true,
      
    });
    console.log(resp.data,"register");

    if (resp && resp.data) {
      toast.success(resp.data.message);
      navigate('/');
    }

  } catch (error) {
    console.log(error,"register");
    setError(error.message);
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
}


  return (
    <div className="flex items-center justify-center w-full my-10" >
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
      <div className="mb-2 flex justify-center">
         <span>
            {" "}
            <p>Logo</p>
          </span>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/Login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        {/* form starts here */}
        <form onSubmit={handleSubmit(signinSubmitHandle)} className="my-10">
          <div className="space-y-5">
            <Input 
            type = "text"
            placeholder = "Enter Your name"
            label ="FullName"
            {...register('fullName',{required : true})}
            />

            <Input 
            type = 'email'
            label = "Email"
            placeholder = "Enter your email"
            {...register('email',{required : true,
              validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
            })}
            />

            <Input 
            label = "Password"
            type ="password"
            placeholder = "Enter your password"
            {...register('password',{required : true})}
            />
            <Button bgColor="blue" type="submit" btnText={"Sign Up"} textColor='white' ></Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin