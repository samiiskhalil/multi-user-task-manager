const mongoose = require('mongoose')
const taskSchema=new mongoose.Schema({
    finishedFlage:{
        type:Boolean,
        default:false
    },
    title:String,
    describtion:String,
    userId:{ required:true,type:mongoose.Schema.Types.ObjectId,ref:'userModel'}
})
module.exports=mongoose.model('taskModel',taskSchema)