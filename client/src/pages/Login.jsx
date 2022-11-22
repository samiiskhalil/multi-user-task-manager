import Cookies from 'js-cookie'
import React,{useState} from 'react'
import { useNavigate } from 'react-router'
import '../styles/index.css'
const Login = () => {
  const [user,setUesr]=useState({})

const navigate=useNavigate()
function handleLogin(e) {
  e.preventDefault()
  console.log(user)
  fetch(`http://localhost:3000/api/users/login`,{

    method:"POST",
    headers:{
      'content-type':'application/json',
      'accept':'application/json'
    }
    ,
    body:JSON.stringify({
      email:user.email,
      password:user.password
    })
  })
  .then(res=>{
    if(res.ok)
    return res.json()
    
  })
  .then(data=>{
    Cookies.set('token',data.token)
    Cookies.set('userId',data.userId)
    navigate('/')
  })
}
function handleChange(e){
setUesr(pre=>{
return  {... pre,[e.target.name]:e.target.value}
}
)
  }

  return (
    
    <div className="container" style={{marginTop:'70px'}}>
      <form className='flex flex-dir-column jusctify-center align-center'>
      <input onChange={handleChange} placeholder="email" type="text" name="email" id="email"/>
      <input onChange={handleChange} placeholder="password" type="password" name="password" id="password"/>
      <button onClick={handleLogin} type='btn' className="btn">submit now</button>

      </form>
    </div>
    )
}

export default Login