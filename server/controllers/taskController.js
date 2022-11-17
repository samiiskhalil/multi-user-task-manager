const taskModel =require('../models/taskModel.js')
const userModel=require('../models/userModel.js')
class taskController{
    constructor(){
    }
    static async getTasks(req,res){
        const tasks=await taskModel.find({userId:req.body.userId})
        res.status(200).json(tasks)
    }
    static async createTask(req,res){
        const task=await taskModel.create(req.body.task)

        let user=await userModel.findById(req.body.task.userId)
        await user.tasksId.push(task.id)
        await user.save()
        console.log(user)
        return res.status(201).json(task)
    }
static async deleteTask(req,res){
    await taskModel.findByIdAndDelete(req.body.task.id)
    return res.status(200).json({msg:'deleted'})
}
static async updateTask(req,res){
    let task=await taskModel.findById(req.body.task.id)
    console.log(task)
    task.title=req.body.task.title
    task.describtion=req.body.task.describtion
    await  task.save()
   return res.status(201).json(task)
}
}
module.exports=taskController