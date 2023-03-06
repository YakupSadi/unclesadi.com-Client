const { CustomError } = require('../middleware/custom_error')
const express = require('express')
const File = express.Router()

// Multer
const multer  = require('multer')
const multerLimits = multer({
    limits: 1024 * 1024 * 1,
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new CustomError('Image Not Found'))
        }
        cb(null, true)
    },
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        },
        destination: (req, file, cb) => {
            cb(null, 'uploads/')
        }
    })
})

const { 
    getFile,
    getAllFile,
    createFile,
    deleteFile,
    updateFile
} = require('../controller/file')

File.route('/file').get(getAllFile)
File.route('/file/uploads/:image').get(getFile)
File.route('/file/createFile').post(createFile, multerLimits.single('image'))

File.route('/file/:id')
    .post(updateFile, multerLimits.single('image'))
    .delete(deleteFile)

module.exports = File

/*
const { CustomError } = require('../middleware/custom_error')
const express = require('express')
const File = express.Router()

// Multer
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });

const { 
    createFile
} = require('../controller/file')

File.route('/file/createFile').post(upload.single('image'), createFile)

module.exports = File
*/

/*
const { CustomError } = require('../middleware/custom_error')
const express = require('express')
const File = express.Router()

// Multer
const multer  = require('multer')
const multerLimits = multer({
    limits: 1024 * 1024 * 1,
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new CustomError('Image Not Found'))
        }
        cb(null, true)
    },
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        },
        destination: (req, file, cb) => {
            cb(null, 'uploads/')
        }
    })
})

const { 
    createFile
} = require('../controller/file')

File.route('/file/createFile').post(multerLimits.single('image'), createFile)

module.exports = File
*/