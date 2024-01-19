import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createContext } from 'react'

// created context to check whether user is logged in or not 
export const Context=createContext({isAuthenticated:false}); 
export const server="https://todobackend-7nto.onrender.com";

const AppWrapper =()=>{
  const [isAuthenticated,setisAuthenticated]=useState(true);
  const [user,setUser]=useState({});
  return <>
  {/* passed value to all child components */}
  <Context.Provider value={{isAuthenticated,setisAuthenticated,user,setUser}}>
    <App/>
  </Context.Provider>
  </>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
