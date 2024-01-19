import axios from 'axios';
import React, { useContext, useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Context, server } from '../main';
import { toast } from 'react-hot-toast';
import Todoitem from './Todoitem';
import Loader from './Loader';

function Todo() {
    const { register, reset, handleSubmit } = useForm();
    const { isAuthenticated } = useContext(Context);
    const [ tasks, setTask ] = useState();
    const [refresh, setRefresh] = useState(false);
    const[loading,setloading]=useState(true);

    const updateHandler = async(id)=>{
        try {
            const resdata = await axios.put(`/api/v1/tasks/${id}`,
             {
                withCredentials: true,
            });
            setRefresh(!refresh);
            toast.success(resdata.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const deleteHandler = async(id)=>{
        try {
            const resdata = await axios.delete(`${server}/api/v1/tasks/${id}`,
             {
                withCredentials: true,
            });
            setRefresh(!refresh);
            toast.success(resdata.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const onsubmit = async (data) => {
        try {
            const { title, description } = data;
            const resdata = await axios.post(`${server}/api/v1/tasks/addTask`,
                {
                    title,
                    description,
                }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
           
            reset();
            setRefresh(!refresh);
            toast.success(resdata.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            reset();
        }
    }

    const fetchTask=async()=>{
        try {
            if (isAuthenticated) {
                setloading(true);
                const { data } = await axios.get(`${server}/api/v1/tasks/allTasks`);
                setTask(data.taskList);
                setloading(false);
            }else{
                setTask([]);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchTask()
    },[refresh]);

    return (
        <div>
            <div className='flex flex-col items-center w-full my-10'>
                <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col items-center w-[50%] bg-white p-10'>
                    <input {...register('title')} type="text" placeholder='Title' className='px-4 border-[1px] border-gray-400 outline-none my-2 w-full py-2' />
                    <input {...register('description')} type="text" placeholder='description' className='px-4 border-[1px] border-gray-400 outline-none my-2 w-full py-2' />
                    <button type='submit' className='px-10 py-1 my-2 bg-black text-white rounded-sm '>Add Task</button>
                </form>
            </div>

            <div className='flex flex-col items-center w-full my-10'>
                
                { loading ? <Loader/> : tasks?.map((task) => (
                    <Todoitem
                    key={task._id}
                    id={task._id}
                    title={task.title}
                    iscompleted={task.iscompleted}
                    description={task.description}
                    deleteHandler={deleteHandler}
                    updateHandler={updateHandler}
                    />
                ))}
            </div>


        </div>
    )
}

export default Todo