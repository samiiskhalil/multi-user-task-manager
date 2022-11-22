const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken')
class usersMiddleware{
    constructor(){

    }
    static async createToken(req,res,next){
      try{
         console.log(req.email)
         const token=await jwt.sign({email:req.email,userId:req.userId},process.env.TOKEN_KEY)
         return res.status(201).json({token,userId:req.userId})
      }
      catch(err){
         res.send(err.message)
      }
      }
    static async verifyToken(req,res,next){try{
       const token=req.headers.authorization.split(' ')[1]
       jwt.verify(token,process.env.TOKEN_KEY,(err,data)=>{
         req.email=data.email
         req.userId=data.userId
          if(err) res.status(400).json({msg:'token not authorized'})
         
         })
         next()
      }catch(err){
         res.json(err.message)
      }
   }
static async findUser(req,res,next){
   console.log('a')
   let user={}
   const response=await userModel.findOne({email:req.body.email})
   if(response){
    user=await userModel.findOne({password:req.body.password})
    if(user)
    {
      req.userId=user._id
      req.email=user.email

      return next()
   }}
   return res.status(400).json({msg:'email or password were wrong'})
   }
}
module.exports=usersMiddleware