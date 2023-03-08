const { CustomError } = require('../middleware/custom_error')
const express = require('express')
const Content = express.Router()

const {
    getAllContent,
    createContent
} = require('../controller/content')

Content.route('/content').get(getAllContent)
Content.route('/content/createContent').post(createContent)

module.exports = Content