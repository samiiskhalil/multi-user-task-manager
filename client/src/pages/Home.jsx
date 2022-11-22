import React,{useEffect,useState,useRef} from 'react'
import '../styles/home.css'
import Cookies from 'js-cookie'
import { json, useNavigate } from 'react-router'
import { set } from 'mongoose'
const Home = () => {
    const [hidePopUpFlage,setHidePopUpFlage]=useState(true)
    const [users,setUsers]=useState({})    
    const [task,setTask]=useState({finishedFlage:false})    
    const [tasks,setTasks]=useState([])    
    const [reloadFlage,setReloadFlage]=useState(false)
    const [selectedUser,setSelectedUser]=useState({})
    const [selectedUsers,setSelectedUsers]=useState([])
    const checkRef=useRef('')
    const titleRef=useRef('')
    const describtionRef=useRef('')
    const [user,setUesr]=useState({})
    const searchRef=useRef('')
const navigate=useNavigate()
function handleLogin(e) {
    e.preventDefault()
    navigate('/login')
}

    useEffect(()=>{
        console.log('fetching tasks')
        fetch('http://localhost:3000/api/task',{
            headers:{
                authorization:`BEARER ${Cookies.get('token')}`
            }
        }).then(res=>res.json())
        .then(data=>{setTasks(data)
        })
        fetch('http://localhost:3000/api/users/',{
            headers:{
                'authorization':`BEARE ${Cookies.get('token')}`
            }
        })
        .then(res=>res.json())
        .then(data=>setUsers(data))
    }
    ,[])
    function handleClick(e) {
        console.log('posting data')
        fetch('http://localhost:3000/api/task/create-task',{
            headers:{
                'content-type':'application/json',
                'authorization':`BEARER ${Cookies.get('token')}`
               },
            method:"POST",
            body:JSON.stringify({
              ...task,userId:Cookies.get('userId')
            })
        })
        .then(res=>res.json())
        .then(data=>{
            setTasks(pre=>[... pre,data])
            titleRef.current.value=''
            describtionRef.current.value=''
            })}
        
        function handleChange(e) {
            setTask(pre=>{

                return {... pre,[e.target.name]:e.target.value}
        })
    }
    function handleUpdate(e,task){
        setTask(pre=>{
            return{...pre,finishedFlage:e.target.checked
            }
        })
        fetch('http://localhost:3000/api/task/update-task',{
            method:"POST",
            headers:{
                'Authorization':`BEARER ${Cookies.get('token')}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
            ...task,finishedFlage:e.target.checked
            })
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
    }
    function handleSearch(e){
        setHidePopUpFlage(false)
        const inp =searchRef.current.value
        if (!inp)
        return null
        let selectedUsers= users.filter(user=>{
            if(inp===user.userName.slice(0,inp.length))
            return true
        }
        )
        setSelectedUsers(selectedUsers)
    }
    return (
        <>
        <div className="container">

        {Cookies.get('token')?<div className="container ">
        
        <header className="flex space-between align-center">
            <nav className="flex jusctify-center align-center">
                
                <a  href="/">
                    <img src="https://img.icons8.com/ios-filled/50/null/cottage--v1.png"/>
                </a>
            </nav>
            <span className="search-container">
                <button onClick={e=>{
                    e.preventDefault()
                    setHidePopUpFlage(true)
                    console.log(selectedUser)
                    navigate(`/${selectedUser._id}`)
                    
                }} className="btn-circle search-btn ">
                    <img src="https://img.icons8.com/ios-glyphs/30/null/search--v1.png"/>
                </button>
                <input ref={searchRef} onChange={handleSearch} className="search-input" placeholder="what are you searchng for" type="text" name="search-input" id="search-input"/>
                <div className={`search-pop-up ${hidePopUpFlage&&'hide'}`}>
                {selectedUsers.map((user,index)=>
                    <div key={index} onClick={(e)=>{
                        setHidePopUpFlage(true)
                        searchRef.current.value=e.target.innerHTML
                        setSelectedUser(user)
                    }}
                     className="user-container">
                        {user.userName}
                       </div>
            )}
                </div>
            </span>
        </header>
        <main>
            
            <form className="form-container">
                <input  ref={titleRef} onChange={handleChange} placeholder="title" type="text" name="title" id="title"/>
                <input ref={describtionRef} onChange={handleChange} placeholder="describtion" type="text" name="describtion" id="describion"/>    
                 <button onClick={handleClick} type="button" className="btn ">submit task</button>                    
                </form>
                <section>
        
                <div className="tasks-container">
                    {tasks.map((task,index)=>
                           {
                               return <div key={index} className="task-container">
                                <h2>{task.title}</h2>
                                <p> {task.describtion}</p>
                                <span>
                                    {/* <button type='button' onClick={(e)=>console.log('a')} className="btn"> update </button> */}
                                    <button type='button' onClick={(e)=>{
                                        console.log(task._id)
                                        fetch('http://localhost:3000/api/task/delete-task',{
                                            method:"DELETE",
                                            headers:{
                                                'Authorization':`BEARER ${Cookies.get('token')}` ,
                                                'content-type':'application/json'
                                            },body:JSON.stringify({
                                         id:task._id
                                        })
                                        
                                    }).then(res=>res.json())
                                    .then(data=>setTasks(data))
                                } }className="btn">delete</button>
                                </span>
                            </div>
                        }
                        )}
                </div>
                <button onClick={(e)=>{
        Cookies.remove('token')
        Cookies.remove('userId')
        navigate('/login')
    }} className="btn">log out</button>
                        </section>
            </main>
        </div>
    :
    <span className="container login-container">

    <h1>do you have an account?</h1>
    <button onClick={handleLogin} className='btn ' >log in </button>

      </span>
    }

    </div>
    </>
    )
}

export default Home