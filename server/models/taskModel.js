const mongoose = require('mongoose')
const taskSchema=new mongoose.Schema({
    finishedFlage:Boolean,
    title:String,
    describtion:String,
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'userModel'}
})
module.exports=mongoose.model('taskModel',taskSchema)