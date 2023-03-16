const fs = require('fs');
const path = require('path')
const File = require('../models/file')
const async = require('../middleware/asycn')
const { CustomError } = require('../middleware/custom_error')


const getAllFile = async( async(req, res) => {
    const data = await File.find({})
    res.status(200).json({ data })
})

const getFile = async( async(req, res) => {
    const image = req.params.image
    res.sendFile(path.join(__dirname, '../uploads', image))
})

const getSlug = async( async(req, res, next) => {
    const { id: dataTitle } = req.params
    const data = await File.findOne({ title: dataTitle })

    if(!data) {
        return next(new CustomError('File not Found'))
    }

    res.status(200).json({ data })
})

const createFile = async( async(req, res, next) => {
    const { title, folder } = req.body
    const image = req.file.path

    if(!image || !title || !folder) {
        return next(new CustomError('File or Title or Folder Not Found'))
    }

    const file = new File({ title, folder, image })
    await file.save()

    res.status(201).json({ msg: 'File Created'})
})

const updateFile = async( async(req, res, next) => {
    const { title, folder, old } = req.body
    const image                  = a = req.file ? req.file.path : old
    const { id: dataID }         = req.params

    console.log(image)
    console.log(old)

    if(!title || !folder) {
        return next(new CustomError('File or Title or Folder Not Found'))
    }

    const data = await File.findOneAndUpdate({ _id: dataID }, {
        new    : true,
        title  : title,
        folder : folder,
        image  : image,
        runValidators: true
    })

    if(!data) {
        return next(CustomError('File Not Found'))
    }

    if(old !== image) {
        fs.unlink(path.join(__dirname, '../', old), (err) => {
            if (err) {
                console.log(err)
            }
        })
    }

    res.status(200).json({ msg: 'File Updated' })
})

const deleteFile = async( async(req, res, next) => {
    const { image } = req.body
    const { id: dataID } = req.params
    const data = await File.findOneAndDelete({ _id: dataID })

    if(!data) {
        return next(CustomError('File Not Found'))
    }

    fs.unlink(path.join(__dirname, '../', image), (err) => {
        if (err) {
            return next(new CustomError('Something Went Wrong'))
        }
    })

    res.status(200).json({ msg: 'File Deleted' })
})


module.exports = {
    getFile,
    getSlug,
    getAllFile,
    createFile,
    deleteFile,
    updateFile
}