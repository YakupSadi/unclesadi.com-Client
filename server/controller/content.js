const fs = require('fs');
const path = require('path')
const Content = require('../models/content')
const async = require('../middleware/asycn')
const { CustomError } = require('../middleware/custom_error')

const getAllContent = async( async(req, res) => {
    const data = await Content.find({})
    res.status(200).json({ data })
})

const createContent = async( async(req, res, next) => {
    const { title, outputData } = req.body

    const content = await Content.create({
        title: 'Hi',
        data: outputData
    });

    if(!content) {
        return next(new CustomError('Content Not Found'))
    }

    res.status(201).json({ msg: 'Content Created' })
})


module.exports = {
    createContent,
    getAllContent
}