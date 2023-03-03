const express = require('express')
const Folder = express.Router()

const { 
    getFolder,
    getAllFolder,
    createFolder,
    deleteFolder

} = require('../controller/folder')

Folder.route('/folder').get(getAllFolder)
Folder.route('/createFolder').post(createFolder)
Folder.route('/folder/:id').delete(deleteFolder)

module.exports = Folder