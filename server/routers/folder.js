const express = require('express')
const Folder = express.Router()

const { 
    getFolder,
    getAllFolder,
    createFolder,

} = require('../controller/folder')

Folder.route('/folder').get(getFolder)
Folder.route('/createFolder').post(createFolder)

module.exports = Folder