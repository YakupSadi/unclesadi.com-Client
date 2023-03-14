const Content = require('../models/content')
const async = require('../middleware/asycn')
const { CustomError } = require('../middleware/custom_error')


const getAllContent = async( async(req, res) => {
    const data = await Content.find({})
    res.status(200).json({ data })
})

const getContent = async( async(req, res, next) => {
    const { id: dataID } = req.params
    const data = await Content.findOne({ _id: dataID })

    if(!data) {
        return next(new CustomError('Folder not Found'))
    }

    res.status(200).json({ data })
})

const getSlug = async( async(req, res, next) => {
    const { id: dataTitle } = req.params
    const data = await Content.find({ file: dataTitle })
    
    if(!data) {
        return next(new CustomError('Folder not Found'))
    }

    res.status(200).json({ data })
})

const createContent = async( async(req, res, next) => {
    const { title, file, outputData } = req.body

    const content = await Content.create({
        title : title,
        file  : file,
        data  : outputData.blocks
    })

    if(!content) {
        return next(new CustomError('Content Not Found'))
    }

    res.status(201).json({ msg: 'Content Created' })
})

const updateContent = async( async(req, res, next) => {
    const { id: dataID } = req.params
    const content = {
        title : req.body.title,
        file  : req.body.file,
        data  : req.body.outputData.blocks
    }

    const data = await Content.findOneAndUpdate({ _id: dataID }, content, {
        new: true,
        runValidators: true
    })

    if(!data) {
        return next(new CustomError('Content Not Found'))
    }

    res.status(200).json({ msg: 'Content Updated' })
})

const deleteContent = async( async(req, res, next) => {
    const { id: dataID } = req.params
    const data = await Content.findOneAndDelete({ _id: dataID })

    if(!data) {
        return next(CustomError('Content Not Found'))
    }

    res.status(200).json({ msg: 'Content Deleted' })
})


module.exports = {
    getSlug,
    getContent,
    createContent,
    getAllContent,
    updateContent,
    deleteContent
}