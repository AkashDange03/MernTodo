import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import axios from 'axios'
import { Context } from '../main'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
    const { register, handleSubmit } = useForm();
    const { iseAuthenticated, setisAuthenticated } = useContext(Context);
    const navigate=useNavigate();
    const onsubmit = async (data) => {
        try {
            const { email, password } = data;
            const resdata = await axios.post("/api/v1/users/login",
                {
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
        } catch (error) {
            toast.error(error.response.data.message);
            setisAuthenticated(false);
        }

    }

    return (
        <>
            <div className='flex flex-col items-center w-full my-10'>
                <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col items-center w-[50%] bg-white p-10'>
                    <input {...register('email')} type="email" placeholder='Email' className='px-4 border-[1px] border-gray-400 outline-none my-2 w-full py-2' />
                    <input {...register('password')} type="password" placeholder='password' className='px-4 border-[1px] border-gray-400 outline-none my-2 w-full py-2' />
                    <button className='px-10 py-1 my-2 bg-black text-white rounded-sm '>Login</button>
                </form>
                or
                <Link to="/signup">signup</Link>
            </div>
        </>
    )
}

export default LoginForm