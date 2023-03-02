const express = require('express')
const Folder = express.Router()

// Auth
const auth = require('../middleware/auth')

const { 
    getFolder,
    getAllFolder,
    createFolder,

} = require('../controller/folder')

Folder.route('/folder').get(auth, getFolder)
Folder.route('/createFolder').post(auth, createFolder)

module.exports = Folder