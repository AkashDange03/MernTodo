import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast"
import { Context, server } from '../main';

function SignupForm() {
    const { register, handleSubmit ,formState: { errors }} = useForm();
    const navigate = useNavigate();
    const {setisAuthenticated}=useContext(Context);
    const onsubmit = async (data) => {
        try {
            const { name, email, password } = data;
            const resdata = await axios.post(`${server}/api/v1/users/register`,
                {
                    name,
                    email,
                    password
                }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            toast.success(resdata.data.message);
            setisAuthenticated(true);
            navigate("/");
        }catch(error){
        toast.error(error.response.data.message);
        setisAuthenticated(false);
        }
      
    }

    return (
        <>
            <div className='flex flex-col items-center w-full my-10'>
                <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col items-center w-[50%] bg-white p-10'>
                    <input id="name" {...register('name',{required:true})} type="text" placeholder='Name' className='px-4 border-[1px] border-gray-400 outline-none my-2 py-2 w-full' />
                    {errors.name && errors.name.type === "required" && <span  className='w-full text-red-400 text-sm'>*This is required</span>}
                    <input id="email" {...register('email',{required:true})} type="email" placeholder='Email' className='px-4 border-[1px] border-gray-400 outline-none my-2 py-2 w-full' />
                    {errors.email && errors.email.type === "required" && <span  className='w-full text-red-400 text-sm'>*This is required</span>}
                    <input id="password" {...register('password',{required:true})} type="password" placeholder='password' className='px-4 border-[1px] border-gray-400 outline-none my-2 py-2 w-full' />
                    {errors.password && errors.password.type === "required" && <span className='w-full text-red-400 text-sm'>*This is required</span>}
                    <button className='px-10 py-1 my-2 bg-black text-white rounded-sm ' type='submit'>Signup</button>
                </form>
                or
                <Link to="/login">Login</Link>
            </div>
        </>
    )
}

export default SignupForm