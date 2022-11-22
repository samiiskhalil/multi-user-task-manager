const taskModel =require('../models/taskModel.js')
const userModel=require('../models/userModel.js')
class taskController{
    constructor(){
    }
    static async getTasks(req,res){
        try{
            console.log(req.userId)
            const tasks=await taskModel.find({userId:req.userId})

            if(!tasks){
              return  res.send('aa')
            }
            return  res.status(200).json(tasks)}
        catch(err){
           return res.status(400).send(err.message)
        }
    }
    // static async getUserTasks(req,res){
    //     try{
    //         const user=await taskModel.findById()
    //         res.status(200).json(tasks)
    //     }
    //     catch(err){
    //         req.send(err.message)
    //     }
    // }
    static async createTask(req,res){
        console.log(req.body,'aaa')
        const task=await taskModel.create(req.body)
        let user=await userModel.findById(req.userId)
        // console.log(user)
        await user.tasksId.push(task.id)
        await user.save()
        // console.log(user)
        return res.status(201).json({finishedFlage:task.finishedFlage,id:task.id,userId:task.userId,describtion:task.describtion,title:task.title})
    }
static async deleteTask(req,res){try{
    console.log(req.userId)
    await taskModel.findByIdAndDelete(req.body.id)
    const tasks=await taskModel.find({userId:req.userId})
    return res.status(200).json(tasks)}
    catch(err){
        res.send(err.message)
    }
}
static async updateTask(req,res){
    try{
        // console.log(req.body)
        let task=await taskModel.findById(req.body._id)
        console.log(task)
        
        task.title=req.body.title
        task.describtion=req.body.describtion
    task.finishedFlage=req.body.finishedFlage
    await  task.save()
    console.log('a')
   return res.status(201).json({finishedFlage:task.finishedFlage,id:task.id,userId:task.userId,describtion:task.describtion,title:task.describtion})}
   catch(err){
    res.status(400).send(err.message)
   }
}
}
module.exports=taskController