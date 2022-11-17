const main=document.querySelector('main')
const tasksContainer=document.createElement('div')
tasksContainer.classList.add('tasks-container')
main.appendChild(tasksContainer)
//fetch tasks
fetch('http://localhost:3000/api/task/',{
    method:"GET",headers:{
      Authorization:`BEARER ${localStorage.getItem('token')}`   
    }
}).then(res=>res.json())
.then(data=>{
    const reversedData=data.reverse()
console.log(data)
reversedData.forEach(task => {
    createTask(task.title,task.describtion)
});})

//generate task

const createTask=(title,describtion)=>{
    const taskContainer=document.createElement('div')
    taskContainer.classList.add('task-container')
tasksContainer.appendChild(taskContainer)
const h2=document.createElement('h2')
const p=document.createElement('p')
const span=document.createElement('span')
taskContainer.appendChild(h2)
h2.innerHTML=title
taskContainer.appendChild(p)
p.innerHTML=describtion
taskContainer.appendChild(span)
const label=document.createElement('label')
label.setAttribute('for','finished')
label.innerHTML='finished'
span.appendChild(label)
const input=document.createElement('input')
span.appendChild(input)
input.setAttribute('type','checkbox')
input.setAttribute('name','finished')
input.setAttribute('id','finished')
input.setAttribute('id','finished')
}
