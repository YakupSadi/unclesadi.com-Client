const express         = require('express')
const Content         = express.Router()
const multer          = require('multer')
const auth            = require('../middleware/auth')
const { CustomError } = require('../middleware/custom_error')


const multerLimits = multer({
    limits: 1024 * 1024 * 5,

    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new CustomError('Image Not Found'))
        }

        cb(null, true)
    },

    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
        },

        destination: (req, file, cb) => {
            cb(null, 'uploads/')
        }
    })
})


const {
    img,
    getSlug,
    getContent,
    slugDetail,
    getAllContent,
    createContent,
    updateContent,
    deleteContent
} = require('../controller/content')


Content.route('/content').get(getAllContent)
Content.route('/content/slug/:id').get(getSlug)
Content.route('/detail/slug/:id').get(slugDetail)
Content.route('/content/img').post(auth, multerLimits.single('image'), img)
Content.route('/content/createContent').post(auth, multerLimits.single('image'), createContent)

Content.route('/content/:id')
    .get(getContent)
    .put(auth, updateContent)
    .delete(auth, deleteContent)


module.exports = Content