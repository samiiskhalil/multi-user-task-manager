const userMOdel = require('../models/userModel.js');
const jwt = require('jsonwebtoken')
class usersMiddleware{
    constructor(){

    }
    static async createToken(req,res,next){
       const token=await jwt.sign({user:req.user},process.env.TOKEN_KEY,{expiresIn:'1w'})
       return res.status(201).json({token,userId:req.user.id})
      }
    static async verifyToken(req,res,next){
      const token=req.headers.authorization.split(' ')[1]
      console.log(token)
      jwt.verify(token,process.env.TOKEN_KEY,(err,data)=>{
         if(err) res.status(400).json({msg:'token not authorized'})
         req.user=data
         console.log(req.user)
         return next()
      })
   }
static async findUser(req,res,next){
   const email=req.body.email
   const password=req.body.password
   const user={}
   const response=await userModel.findOne({email:email})
   if(response)
    user=await userModel.findOne({password:password})
    if(user)
    {req.user=user
      return next()
   }
   return res.status(400).json({msg:'email or password were wrong'})
   }
}
module.exports=usersMiddleware