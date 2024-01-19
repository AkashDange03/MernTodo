import React from 'react'

function Todoitem({ id,title, description,updateHandler,deleteHandler,iscompleted }) {
  return (
      <div  className='w-[40%] flex flex-row justify-between px-4 border-[1px]  shadow-md outline-none my-2  py-2 bg-white'>
        <div className='w-[60%] gap-2'>
          <h1>Title: {title}</h1>
          <h1>Description: {description}</h1>
        </div>
        <input onChange={()=>updateHandler(id)} type="checkbox" checked={iscompleted} />
        <button onClick={()=>deleteHandler(id)} className='px-10 py-1 my-2 bg-black text-white rounded-sm '>Delete</button>
      </div>
  )
}

export default Todoitem