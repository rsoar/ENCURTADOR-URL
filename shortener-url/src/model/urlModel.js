const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    urlRec: {
        type: String,
        required: true
    },
    urlEnc: {
        type: String,
        required: true
    },
    urlCode: {
        type: String
    }
})

const url = mongoose.model('Url', urlSchema)

module.exports = url