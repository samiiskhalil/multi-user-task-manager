const express = require('express')
const mysql = require('mysql2');
const {userModel} = require('./models/userModel.js');
const {connection} = require('./models/connection.js');
const {taskModel}=require('./models/taskModel.js')
const usersRouter=require('./routes/usersRoute.js');
const addDatabaseConnection = require('./middleware/addDataBaseConnection.js');
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(addDatabaseConnection)
const database=new connection('localhost','root','samiiskhalil@242761','taskmanagerschema')
const conKey= database.connect()
database.useTaskManagerSchema()
const User=new userModel(conKey)
const Task=new taskModel(conKey)
app.use('/users',usersRouter) 
app.listen(3000,()=>console.log('running'))