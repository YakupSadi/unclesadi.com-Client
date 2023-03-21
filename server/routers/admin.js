const express = require('express')
const Admin   = express.Router()
const auth    = require('../middleware/auth')


const { 
    login,
    logOut,
    isValid,
    register,
} = require('../controller/admin')


Admin.route('/login').post(login)
Admin.route('/register').post(register)
Admin.route('/logout').post(auth, logOut)
Admin.route('/auth').post(auth, isValid)


module.exports = Admin