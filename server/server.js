const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter=require('./routes/usersRouter.js')
const taskRouter=require('./routes/taskRouter.js') 
const express = require('express')
require('dotenv').config()
const app=express()
mongoose.connect('mongodb://localhost/task-manager',()=>console.log('connected'),(err)=>console.log(err))
app.use(cors({
    origin:'*'
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/task',taskRouter)
app.use('/api/users',usersRouter)
app.listen(3000,()=>console.log('htt10'))