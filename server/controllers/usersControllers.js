const {User} = require('../server.js');
class usersController{
    constructor() {
    }
    static getUser(req,res){
        console.log(User)
        // return res.send(User.getUsers)
        // const user= User.getUser(1)
    //    return res.status(200).json({user})
        }
    static getUsers(req,res){
        return User.getUsers(req.params.userId)
    }
    static createUser(req,res){
        const {firstName,lastName,email,password}=req.body
        return User.createUser(firstName,lastName,email,password)
    }
}
module.exports={usersController}