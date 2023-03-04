const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('File', FileSchema)