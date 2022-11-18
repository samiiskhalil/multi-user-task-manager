import React,{useEffect,useState} from 'react'
import '../styles/home.css'
import Cookies from 'js-cookie'
const User = () => {
const [task,setTask]=useState({})    
const [tasks,setTasks]=useState([])    
const [reloadFlage,setReloadFlage]=useState(false)
useEffect(()=>{
        fetch('http://localhost:3000/api/task',{
            headers:{
                authorization:`BEARER ${Cookies.get('token')}`
            }
        }).then(res=>res.json())
        .then(data=>console.log(data))
    },[tasks])
    function handleClick(e) {
        fetch('http://localhost:3000/api/task/create-task',{
            headers:{
                'content-type':'application/json',
                'authorization':`BEARER ${Cookies.get('token')}`
               },
            method:"POST",
            body:JSON.stringify({
                task
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setTask(data)})
        .then(setTasks(pre=>[... pre,task]))
    }
    function handleChange(e) {
        setTask(pre=>{
            return {... pre,[e.target.name]:e.target.value}
        })
    }
  return (
    <>
  <div className="container ">
        
        <header className="flex space-between align-center">
            <nav className="flex jusctify-center align-center">
                
                <a  href="/home/home.html">
                    <img src="https://img.icons8.com/ios-filled/50/null/cottage--v1.png"/>
                </a>
            </nav>
            <span className="search-container">
                <button className="btn-circle search-btn ">
                    <img src="https://img.icons8.com/ios-glyphs/30/null/search--v1.png"/>
                </button>
                <input className="search-input" placeholder="what are you searchng for" type="text" name="search-input" id="search-input"/>
            </span>
        </header>
        <main>
            <form className="form-container">
                <input  onChange={handleChange} placeholder="title" type="text" name="title" id="title"/>
                <input onChange={handleChange} placeholder="describion" type="text" name="describion" id="describion"/>    
                 <button onClick={handleClick} type="button" className="btn ">submit task</button>                    
                </form>
                <div className="tasks-container">
                    <div className="task-container finished">
                        <h2  >title</h2>
                        <p > Lorem ipsum dolor sit amet.</p>
                        <span><label htmlFor="finished">finished</label><input type="checkbox" name="finished" id="finished"/></span>
                    </div>
                </div>
            </main>
        </div>
    </>
    )
}

export default User