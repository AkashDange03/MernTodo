import React, { useContext } from 'react'
import { Context } from '../main'
import { useNavigate } from 'react-router-dom';

function Profile() {
 const {user} = useContext(Context);
  return (
    <div className='flex flex-row justify-center items-center h-[90vh]'>
       <div className='bg-white w-[200px] h-[100px] flex flex-col '>
      <h1 className='m-2 font-bold '>Name: {user?.name}</h1>
      <h1 className='m-2'>Email: {user?.email}</h1>
    </div>
    </div>
   
  )
}

export default Profile