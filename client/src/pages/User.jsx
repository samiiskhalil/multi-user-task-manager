import React ,{useState,useRef,useEffect}from 'react'
import { useNavigate,useParams } from 'react-router'
import Cookies from 'js-cookie'

const User = () => {
    const [hidePopUpFlage,setHidePopUpFlage]=useState(true)
    const [users,setUsers]=useState({})    
    const [tasks,setTasks]=useState([])    
    const [selectedUser,setSelectedUser]=useState({})
    const [selectedUsers,setSelectedUsers]=useState([])
    const [user,setUesr]=useState({})
    const searchRef=useRef('')
    const navigate=useNavigate()
    const params=useParams()
    useEffect(()=>{
        console.log('fetching users')
       
        fetch('http://localhost:3000/api/users/',{
            headers:{
                'authorization':`BEARE ${Cookies.get('token')}`
            }
        })
        .then(res=>res.json())
        .then(data=>setUsers(data))
    
    }
    ,[])
    useEffect(()=>{
        console.log('fetching tasks')
        fetch(`http://localhost:3000/api/users/${params.id}`,{
            headers:{
        'authorization':`BEARER ${Cookies.get('token')}`
            }})
        
        .then(res=>res.json())
        .then(data=>{
    
             console.log('a')
            setTasks(data)})
        .catch(err=>console.log(err))
    },[])
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
    <div className="container">
         <header className="flex space-between align-center">
            <nav className="flex jusctify-center align-center">
                
                <a  href="/">
                    <img src="https://img.icons8.com/ios-filled/50/null/cottage--v1.png"/>
                </a>
            </nav>
            <span className="search-container">
                <button onClick={e=>{
                    setHidePopUpFlage(true)
   
                    navigate(`/${selectedUser._id}`)
                    window.location.reload()
                }} className="btn-circle search-btn ">
                    <img src="https://img.icons8.com/ios-glyphs/30/null/search--v1.png"/>
                </button>
                <input ref={searchRef} onChange={handleSearch} className="search-input" placeholder="what are you searchng for" type="text" name="search-input" id="search-input"/>
                <div className={`search-pop-up ${hidePopUpFlage&&'hide'}`}>
                {selectedUsers.map(user=>
                    <div onClick={(e)=>{
                        searchRef.current.value=e.target.innerHTML
                        setHidePopUpFlage(true)
                        setSelectedUser(user)
                    }} className="user-container">
                        {user.userName}
                       </div>
            )}
                </div>
            </span>
        </header>
        <section>

<div className="tasks-container">
    {tasks.map((task,index)=>
           {
            return <div key={index} className="task-container">
                <h2>{task.title}</h2>
                <p> {task.describtion}</p>
                
            </div>
        }
        )}
</div>
        </section>
    </div>
    )
}

export default User