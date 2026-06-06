const {Router} = require('express');
const { register, login } = require('../controller/authcontroller');
const authrouter=Router();
authrouter.post('/register', register);
authrouter.post('/login', login);
module.exports=authrouter;