const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.Controller.js');

router.post('/userRegister', userController.userRegister);

module.exports=router;