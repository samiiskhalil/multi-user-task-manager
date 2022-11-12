class userModel{
    constructor(connection){
        this.connection=connection
    }
getUsers(){
        this.connection.query('select firstName,lastName,email from user ',(err,res)=>{
            if(err) throw err
            return res
        })
}
createUser(firstName,lastName,email,password){
    this.connection.query(`INSERT INTO user (firstName,lastName,email,password) VALUES ('${firstName}','${lastName}','${email}','${password}')`,(err,res)=>{
        if(err) throw err
        return res
    })
}
checkForUser(email,password){
        this.connection.query( `select * from user where email='${email}' and password='${password}'`,(err,res)=>{
            if(err) throw err 
            if(res)
            return true
            return false
        })
}
getUser(id){
    this.connection.query(`select firstName,lastName,email from user where id=${id}`,(err,res)=>{
        if(err) throw err
        console.log(res)
    })
}
}

module.exports={userModel}