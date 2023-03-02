const Folder = require('../models/folder')
const async = require('../middleware/asycn')
const { CustomError } = require('../middleware/custom_error')

const getAllFolder = async( async(req, res) => {
    const data = await Folder.find({})
    res.status(200).json({ data })
})

const getFolder = async( async(req, res, next) => {
    const { id: dataID } = req.params
    const data = await Folder.findOne({ _id: dataID })

    if(!data) {
        return next(new CustomError('Folder not Found'))
    }

    res.status(200).json({ data })
})

const createFolder = async( async(req, res) => {
    const data = await Folder.create(req.body)

    res.status(201).json({ data })
})

module.exports = {
    getFolder,
    getAllFolder,
    createFolder
}