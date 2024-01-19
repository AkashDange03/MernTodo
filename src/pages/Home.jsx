import React,{useContext} from 'react'
import LoginForm from '../components/LoginForm'
import { Context } from '../main'
import Todo from '../components/Todo';

function Home() {
  const {isAuthenticated }=useContext(Context);
  return (
    <div>
      {
        isAuthenticated ? <Todo/> :  <LoginForm/>
      }
       
    </div>
  )
}

export default Home