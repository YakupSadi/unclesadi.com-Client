const Admin = require('../models/admin')
const { CustomError } = require('../middleware/custom_error.js')


const register = async (req, res, next) => {
    const { email, password } = req.body

    const emailAlreadyExist = await Admin.findOne({ email })
    if(emailAlreadyExist) {
        return next(new CustomError('Email Already Exits', 400))
    }

    const admin = await Admin.create({ email, password })
    const token = admin.createJWT()

    const time = 1000 * 60 * 60 * 24 * 30
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + time)
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
        return next(new CustomError('Please Provide Email or Password', 400))
    }

    const admin = await Admin.findOne({ email })
    if (!admin) {
        return next(new CustomError('Admin Not Found', 401))
    }

    const isPasswordCorrect = await admin.comparePassword(password)
    if(!isPasswordCorrect) {
        return next(new CustomError('Password is Wrong', 401))
    }

    const token = admin.createJWT()

    const time = 1000 * 60 * 60 * 24 * 30
    res.cookie('token', token, {
        httpOnly: true,
        expires : new Date(Date.now() + time) 
    })

    res.status(200).json({
        admin: {
            email: admin.email
        },
        token
    })
}

const logOut = async (req, res, next) => {
    res.cookie('token', 'logOut', {
        httpOnly: true,
        expires : new Date(Date.now())
    })

    res.status(200).json({
        msg: 'Admin Logged Out'
    })
}

const isValid = async (req, res, next) => {
    res.json({
        message: 'Token is Valid'
    })
}


module.exports = {
    login,
    logOut,
    isValid,
    register,
}