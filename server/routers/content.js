const auth = require('../middleware/auth')
const express = require('express')
const Content = express.Router()

const {
    getSlug,
    getContent,
    getAllContent,
    createContent,
    updateContent,
    deleteContent
} = require('../controller/content')

Content.route('/content').get(getAllContent)
Content.route('/content/createContent').post(auth, createContent)
Content.route('/content/slug/:id').get(getSlug)

Content.route('/content/:id')
    .get(getContent)
    .put(updateContent)
    .delete(deleteContent)

module.exports = Content