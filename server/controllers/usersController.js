const userModel=require('../models/userModel.js')
class usersController{
    constructor() {
        
    }
    static async checkUser(req,res,next){
        console.log(req.body.email)
        const user=await userModel.findOne({email:req.body.email})
       console.log(user)
        if(user) 
        return res.status(400).json({data:'email already exists'})
        return next()
    }
    static async getUsers(req,res){
            let users=await userModel.find()
            return res.status(200).json(users)
    }

static async getUser(req,res){
    // console.log(req.params)
    const user=await userModel.findById(req.params.id)
    console.log(user)
    return res.status(200).json(await user.populate('tasksId'))
    
}
    static async createUser(req,res){
    const user=await userModel.create({
        ... req.body
       }) 
       return res.status(201).json(req.token)

}
static async sendToken(req,res){
    res.status(201).json(req.token)
}
}
module.exports=usersController