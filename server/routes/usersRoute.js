const express = require('express')
const {usersController} = require('../controllers/usersControllers.js');
const router=express.Router()
router.get('/:userId',usersController.getUser)
router.get('/',usersController.getUsers)
module.exports=router