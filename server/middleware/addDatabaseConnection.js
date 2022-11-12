const {conKey} = require('../server.js');
const addDatabaseConnection=(req,res,next)=>{
    console.log(conKey)
    next()
}
module.exports=addDatabaseConnection