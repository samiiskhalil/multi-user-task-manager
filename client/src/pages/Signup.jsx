import React,{useState} from 'react'
import cookie from 'js-cookie'
import { useNavigate } from 'react-router'
import '../styles/signup.css'
const Signup = () => {
const [user,setUesr]=useState({})
const navigate=useNavigate()
function handleChange(e){
setUesr(pre=>{
return  {... pre,[e.target.name]:e.target.value}
}
)
  }
  function handleClick(e) {
    e.preventDefault()
    fetch('http://localhost:3000/api/users/signup',{
      headers:{
        'Content-Type': 'application/json',

      },
      method:'POST',
      body:JSON.stringify({
         ...user
    }
      )
   }
    )
    .then(res=>
      res.json())
    .then(data=>{
      console.log(data)
      cookie.set('token',`${data.token}`)
      cookie.set('userId',`${data.userId}`)
      navigate('/')
      }
    )
  }
function handleLogin(e){
  navigate('/login')
}
  return (
    <div style={{ marginTop:'50px' }} className="container flex flex-dir-column jusctify-center align-center">
      <form  className="flex flex-dir-column jusctify-center align-center">
      <input onChange={handleChange} placeholder="user name" type="text" name="userName" id="userName"/>
      <input onChange={handleChange} placeholder="email" type="text" name="email" id="email"/>
      <input onChange={handleChange} placeholder="password" type="password" name="password" id="password"/>
      <button onClick={handleClick} type='btn' className="btn">submit now</button>
      </form>
      <span className="container login-container">

    <h1>already have an acount?</h1>
    <button onClick={handleLogin} className='btn ' >log in </button>

      </span>
    </div>
 
    )
}

export default Signup