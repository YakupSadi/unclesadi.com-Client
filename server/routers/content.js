const auth = require('../middleware/auth')
const express = require('express')
const Content = express.Router()

const {
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
Content.route('/content/createContent').post(auth, createContent)

Content.route('/content/:id')
    .get(getContent)
    .put(updateContent)
    .delete(deleteContent)

module.exports = Content