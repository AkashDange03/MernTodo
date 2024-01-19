import React, { useContext, useEffect } from "react"
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import axios from "axios";
import { Context, server } from "./main";
function App() {

  const { setUser,isAuthenticated, setisAuthenticated } = useContext(Context);

  // fetching user data using axios
  const fetchUser= async()=>{
    try{
      if(isAuthenticated){
        const {data} = await axios.get(`${server}/api/v1/users/me`,{
          withCredentials:true
        })
        setUser(data.userprofile);
        setisAuthenticated(true);
      }
    }catch(error){
      setUser({});
      setisAuthenticated(false);
    }
 
  }
  
  useEffect(() => {
    fetchUser();
  },[isAuthenticated])

  return (
    <>
      <Router>
        <Header />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
