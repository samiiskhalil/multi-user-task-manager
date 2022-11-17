let inputs=document.querySelectorAll('input')
const btn=document.querySelector('button')
btn.addEventListener('click',(e)=>{
e.preventDefault()
 fetch('http://localhost:3000/api/users/signup',{
    method:'POST',
    headers: { "Content-Type": "application/json" },

    body:JSON.stringify({
        userName:inputs[0].value,
        email:inputs[1].value,
        password:inputs[2].value
    })
}).then(res=> res.json()
).then(data=>{
    if(data.userId&&data.token){

        localStorage.setItem('token',data.token)
        localStorage.setItem('userId',data.userId)
        window.location.assign('http://localhost:5500/home/home.html')
    }
}).catch(err=>console.log(err))

})
