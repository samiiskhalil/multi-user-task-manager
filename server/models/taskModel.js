const connection = require('./connection.js')
class taskModel{
    constructor(connection){
        this.connection=connection
    }
    createTask(title,describtion,userId)
    {
        this.connection.query(`insert into task (title,describtion,userId) values('${title}','${describtion}','${userId}')`,(err,res)=>{
            if(err) throw err
            console.log(res)
        })
    }
    deleteTask(taskId){
        this.connection.query(`delete from task where id=${taskId} `)
    }
    updateTask(taskId,title,describtion){
        this.connection.query(`update task set title='${title}',describtion='${describtion}' where id=${taskId}`)
    }
   static getAllTasks(){
        this.connection.query('select title,describtion,userId from task')
    }
    getUserTasks(userId){
                this.connection.query(`select title,describtion from task where userId='${userId}'`)           
    }
}
module.exports={taskModel}