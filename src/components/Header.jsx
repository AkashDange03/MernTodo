import React from 'react'
import { Link } from "react-router-dom";
import { Context, server } from '../main';
import { useContext } from 'react';
import axios from 'axios';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, isAuthenticated, setisAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  const logouthandler = async () => {
    try {

      await axios.get(`${server}/api/v1/users/logout`,
        {
          withCredentials: true,
        });

      toast.success("Logout Successfull");
  
     setisAuthenticated(false);     navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setisAuthenticated(true);
    }

  }

  return (
    <>
      <div className='flex flex-row justify-between items-center w-[100%] bg-black text-white h-[50px] px-10'>
        <div>Welcome, {user?.name}</div>
        <div className='flex flex-row justify-between w-[30%]'>
          <Link to="/"><div className='hover:bg-white hover:text-black px-10 py-2'>Home</div></Link>
          <Link to="/profile"><div className='hover:bg-white hover:text-black px-10 py-2'>Profile</div></Link>
          {isAuthenticated ? <button onClick={logouthandler} className='hover:bg-white hover:text-black px-10 py-2'>Logout</button> :
            <Link to="/login"><button className='hover:bg-white hover:text-black px-10 py-2'>Login</button></Link>
          }

        </div>
      </div>
    </>
  )
}

export default Header