const fs              = require('fs')
const path            = require('path')
const Content         = require('../models/content')
const async           = require('../middleware/asycn')
const { CustomError } = require('../middleware/custom_error')


const search = async( async(req, res) => {
    const query  = req.query.word
    const file   = req.query.filter || 'All'

    const results = await Content.find({
        title: { 
            $regex: `.*${query}.*`, 
            $options: 'i' 
        },

        ...(file !== 'All' ? { file } : {})
    })

    res.status(200).json({ results })
})


const getAllContent = async( async(req, res) => {
    const data = await Content.find().sort({ createdAt: -1 })
    res.status(200).json({ data })
})


const getContent = async( async(req, res, next) => {
    const { id: dataID } = req.params
    const data = await Content.findOne({ _id: dataID })

    if(!data) {
        return next(new CustomError('Content Not Found'))
    }

    res.status(200).json({ data })
})


const getSlug = async( async(req, res, next) => {
    const { id: dataTitle } = req.params
    const data = await Content.find({ file: dataTitle })

    if(!data) {
        return next(new CustomError('Content Not Found'))
    }

    res.status(200).json({ data })
})


const slugDetail = async( async(req, res, next) => {
    const { id: dataTitle } = req.params
    const { file }          = req.query

    const data = await Content.findOne({ title: dataTitle })

    if(!data || !file || data.file != file) {
        return next(new CustomError('Content Not Found'))
    }

    res.status(200).json({ data })
})


const createContent = async( async(req, res, next) => {
    const { title, file, outputData } = req.body

    const data = await Content.find({ file: file })
    const titles = data.map(d => d.title)

    if(titles.includes(title)) {
        return next(new CustomError('Title Already Declared!'))
    } else {
        const content = await Content.create({
            title : title,
            file  : file,
            data  : outputData.blocks
        })
        
        if(!content) {
            return next(new CustomError('Content Not Created'))
        }
    }

    res.status(201).json({ msg: 'Content Created' })
})


const editorImg = async( async(req, res, next) => {
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


const updateContent = async( async(req, res, next) => {
    const { id: dataID } = req.params
    const content = {
        title : req.body.title,
        file  : req.body.file,
        data  : req.body.outputData.blocks
    }

    if(!content.title || !content.file) {
        res.status(422).json({ msg: 'Title or File Blank' })
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


const deleteContent = async( async(req, res, next) => {
    const { id: dataID } = req.params
    const data = await Content.findOneAndDelete({ _id: dataID })

    if(!data) {
        return next(CustomError('Content Not Deleted'))
    }

    res.status(200).json({ msg: 'Content Deleted' })
})


module.exports = {
    search,
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