const bcrypt          = require('bcryptjs')
const jwt             = require('jsonwebtoken')
const Admin           = require('../models/admin')
const { CustomError } = require('../middleware/custom_error.js')


const register = async (req, res, next) => {
    const { email, password } = req.body

    const emailAlreadyExist = await Admin.findOne({ email })
    if(emailAlreadyExist) {
        res.status(400).json({ msg: 'Email Already Exist' })
        return next(new CustomError('Email Already Exits', 400))
    }

    const admin = await Admin.create({ email, password })
    const token = admin.createJWT()

    const time = 1000 * 60 * 60 * 24 * 30
    res.cookie('token', token, {
        httpOnly : true,
        expires  : new Date(Date.now() + time)
    })

    res.status(201).json({
        admin: {
            email: admin.email
        },
        token
    })
}


const login = async (req, res, next) => {
    const { email, password } = req.body
    if(!email || !password) {
        res.status(400).json({ msg: 'Email or Password are Blank' })
        return next(new CustomError('Please Provide Email or Password', 400))
    }

    const admin = await Admin.findOne({ email })
    if (!admin) {
        res.status(401).json({ msg: 'Admin Not Found' })
        return next(new CustomError('Admin Not Found', 401))
    }

    const isPasswordCorrect = await admin.comparePassword(password)
    if(!isPasswordCorrect) {
        res.status(401).json({ msg: 'Password is Wrong' })
        return next(new CustomError('Password is Wrong', 401))
    }

    const token = admin.createJWT()

    const time = 1000 * 60 * 60 * 24 * 30
    res.cookie('token', token, {
        httpOnly : true,
        expires  : new Date(Date.now() + time) 
    })

    res.status(200).json({
        admin: {
            email: admin.email
        },
        token
    })
}


const getInfo = async (req, res, next) => {
    let token
    const authHeader = req.headers.authorization
    
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1]
    }

    if (!token) { return next(new CustomError('Not Found Token')) }

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const info = payload.email

    res.status(200).json({ info })
}


const changeEmail = async( req, res, next) => {
    let token
    const { new_email } = req.body
    const authHeader    = req.headers.authorization

    if(!new_email) {
        return next(new CustomError('Email is Blank'))
    }

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1]
    }

    if (!token) { 
        return next(new CustomError('Not Found Token')) 
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const email = payload.email

    if(new_email === email) {
        return next(new CustomError('Your Old Email is the Same as Your New Email')) 
    }


    //Check Email
    const admin = await Admin.findOne({ email })
    if(!admin) { return next(new CustomError('User Not Found')) }


    // Update Password
    const data = await Admin.findOneAndUpdate({ email: email }, {
        new   : true,
        email : new_email,
        runValidators: true
    })

    if(!data) {
        return next(new CustomError('Email Updated'))
    }


    // Return
    res.cookie('token', 'logOut', {
        httpOnly : true,
        expires  : new Date(Date.now())
    })

    res.status(200).json({ msg: 'Email Changed' })
}


const changePassword = async( req, res, next) => {
    let token
    const { old_pass, new_pass } = req.body
    const authHeader             = req.headers.authorization

    if(!old_pass || !new_pass) {
        return next(new CustomError('Password is Blank'))
    }

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1]
    }

    if (!token) { return next(new CustomError('Not Found Token')) }

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const email = payload.email


    //Check Email
    const admin = await Admin.findOne({ email })
    if(!admin) { return next(new CustomError('User Not Found')) }


    //Check Password
    const isPasswordCorrect = await admin.comparePassword(old_pass)

    if(!isPasswordCorrect) {
        return next(new CustomError('Password is Wrong'))
    }

    
    // Create New Password
    const salt     = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.new_pass, salt)


    // Update Password
    const data = await Admin.findOneAndUpdate({ email: email }, {
        new      : true,
        password : password,
        runValidators: true
    })

    if(!data) {
        return next(new CustomError('Password Updated'))
    }


    // Return
    res.cookie('token', 'logOut', {
        httpOnly : true,
        expires  : new Date(Date.now())
    })

    res.status(200).json({ msg: 'Password Changed' })
}


const logOut = async (req, res, next) => {
    res.cookie('token', 'logOut', {
        httpOnly : true,
        expires  : new Date(Date.now())
    })

    res.status(200).json({ msg: 'Admin Logged Out' })
}


const isValid = async (req, res) => {
    res.json({ message: 'Token is Valid' })
}


module.exports = {
    login,
    logOut,
    getInfo,
    isValid,
    register,
    changeEmail,
    changePassword
}