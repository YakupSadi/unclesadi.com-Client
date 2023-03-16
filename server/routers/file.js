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

/**/
const { 
    getFile,
    getSlug,
    getAllFile,
    createFile,
    deleteFile,
    updateFile
} = require('../controller/file')

File.route('/file').get(getAllFile)
File.route('/detail/slug/:id').get(getSlug)
File.route('/file/uploads/:image').get(getFile)
File.route('/file/createFile').post(multerLimits.single('image'), createFile)

File.route('/file/:id')
    .put(multerLimits.single('image'), updateFile)
    .delete(deleteFile)

module.exports = File