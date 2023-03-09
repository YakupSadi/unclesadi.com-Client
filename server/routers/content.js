const { CustomError } = require('../middleware/custom_error')
const express = require('express')
const Content = express.Router()

const {
    getContent,
    getAllContent,
    createContent
} = require('../controller/content')

Content.route('/content').get(getAllContent)
Content.route('/content/createContent').post(createContent)

Content.route('/content/:id')
    .get(getContent)

module.exports = Content