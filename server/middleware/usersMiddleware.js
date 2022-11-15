const userMOdel = require('../models/userModel.js');
const jwt = require('jsonwebtoken')
class usersMiddleware{
    constructor(){

    }
    static async createToken(req,res,next){
       req.token=await jwt.sign({user:req.user},process.env.TOKEN_KEY,{expiresIn:'1w'})
           return next()
     }
    static async verifyToken(req,res,next){
      jwt.verify(req.body.token,process.env.TOKEN_KEY,(err,data)=>{
         if(err) res.status(400).json({msg:'token not authorized'})
         req.user=data
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