const mysql = require('mysql2');
const {taskModel} = require('./taskModel.js');
class connection{
    constructor(host,user,password,database){
   this.connection = mysql.createConnection({
        host:host,
        user:user,
        password:password,
        database:database
     })
    
    }
    connect(){
        this.connection.connect((err)=>{
            if(err) throw err
            console.log('success')
        })
        return this.connection
    }
    useTaskManagerSchema(){
        this.connection.query('USE taskmanagerschema;',(err,res,fileds)=>{
            if(err) throw err
            // console.log(res)
        })
    }
    showTables(){
        this.connection.query('SHOW TABLES',(err,res)=>{
            if (err) throw err
            // console.log(res)
        })
    }}
module.exports={connection}