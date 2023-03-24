const fs              = require('fs')
const path            = require('path')
const Content         = require('../models/content')
const async           = require('../middleware/asycn')
const { CustomError } = require('../middleware/custom_error')


const getAllContent = async( async(req, res) => {
    const data = await Content.find().sort({ createdAt: -1 })
    res.status(200).json({ data })
})


const getContent = async( async(req, res) => {
    const { id: dataID } = req.params
    const data = await Content.findOne({ _id: dataID })

    res.status(200).json({ data })
})


const getSlug = async( async(req, res) => {
    const { id: dataTitle } = req.params
    const data = await Content.find({ file: dataTitle })

    res.status(200).json({ data })
})


const slugDetail = async( async(req, res) => {
    const { id: dataTitle } = req.params
    const data = await Content.findOne({ title: dataTitle })

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
        return next(new CustomError('Content Not Created'))
    }

    res.status(201).json({ msg: 'Content Created' })
})



const editorImg = async( async(req, res) => {
    const image = req.file.path
    const old   = req.body

    if(!image) {
        return next(new CustomError('Image Not Found'))
    }

    if(old.oldImg !== 'undefined') {
        fs.unlink(path.join(__dirname, '../', old.oldImg.slice(34)), (err) => {
            if (err) {
                console.log(err)
            }
        })
    }

    res.status(200).json({ image })
})


const deleteImg = async( async(req, res) => {
    const del = req.body

    if(del !== 'undefined') {
        fs.unlink(path.join(__dirname, '../', del.del.slice(34)), (err) => {
            if (err) {
                console.log(err)
            }
        })
    }

    res.status(200).json({ del })
})


const updateContent = async( async(req, res) => {
    const { id: dataID } = req.params
    const content = {
        title : req.body.title,
        file  : req.body.file,
        data  : req.body.outputData.blocks
    }

    const data = await Content.findOneAndUpdate({ _id: dataID }, content, {
        new           : true,
        runValidators : true
    })

    if(!data) {
        return next(new CustomError('Content Not Updated'))
    }

    res.status(200).json({ msg: 'Content Updated' })
})


const deleteContent = async( async(req, res) => {
    const { id: dataID } = req.params
    const data = await Content.findOneAndDelete({ _id: dataID })

    if(!data) {
        res.status(204).json({ msg: 'Content Not Deleted' })
        return next(CustomError('Content Not Deleted'))
    }

    res.status(200).json({ msg: 'Content Deleted' })
})


module.exports = {
    getSlug,
    editorImg,
    deleteImg,
    getContent,
    slugDetail,
    createContent,
    getAllContent,
    updateContent,
    deleteContent
}