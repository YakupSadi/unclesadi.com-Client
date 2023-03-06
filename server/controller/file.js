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

const createFile = async( async(req, res, next) => {
    const { title } = req.body
    const image = req.file.path

    if(!image || !title) {
        return next(new CustomError('File or Title Not Found'))
    }

    const file = new File({ title, image })
    await file.save()

    res.status(201).json({ msg: 'File Created'})
})

const updateFile = async( async(req, res, next) => {
    const { title } = req.body
    const image = req.file.path

    if(!image || !title) {
        return next(new CustomError('File or Title Not Found'))
    }
    console.log(title)
    res.status(201).json({ msg: 'File Created'})
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
    });

    res.status(200).json({ msg: 'File Deleted' })
})

module.exports = {
    getFile,
    getAllFile,
    createFile,
    deleteFile,
    updateFile
}

/*
const File = require('../models/file')
const async = require('../middleware/asycn')
const { CustomError } = require('../middleware/custom_error')

const createFile = async( async(req, res, next) => {
    const { title } = req.body
    const image = req.file.path

    if(!image || !title) {
        return next(new CustomError('File or Title Not Found'))
    }

    const file = new File({ title, image })
    await file.save()

    res.status(201).json({ msg: 'File Created'})
})

module.exports = {
    createFile
}
*/

/*
const File = require('../models/file')
const async = require('../middleware/asycn')
const { CustomError } = require('../middleware/custom_error')

const createFile = async( async(req, res, next) => {
    const { title } = req.body

    if(!req.file || !title) {
        return next(new CustomError('File or Title Not Found'))
    }

    const { filename, path, mimetype } = req.file
    const file = new File({ title, filename, path, mimetype })
    await file.save()

    res.status(201).json({ title })
})

module.exports = {
    createFile
}
*/