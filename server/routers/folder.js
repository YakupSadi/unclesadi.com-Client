const express = require('express')
const Folder = express.Router()
const auth = require('../middleware/auth')

const { 
    getFolder,
    getAllFolder,
    createFolder,
    deleteFolder,
    updateFolder

} = require('../controller/folder')

Folder.route('/folder').get(getAllFolder)
Folder.route('/folder/createFolder').post(auth, createFolder)

Folder.route('/folder/:id')
    .put(auth, updateFolder)
    .delete(deleteFolder)

module.exports = Folder