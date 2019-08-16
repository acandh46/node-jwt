'use strict'

const mongoose      = require('mongoose')

const { Schema } = mongoose

const jobSchema = new Schema({
    userName: {type: String, default: null},
    apiurl: {type: String, default: null},
    worker: Number,
    total: {type: Number, default: null},
    item: {type: Number, default: null},
    status: {type: Boolean, default: false},
    fileName: {type: String, default: null},
    fileUrl: {type: String, default: null},
    result: {type: String, default: null},
    last: {type: String, default: null},
    live: {type: Number, default: null},
    die: {type: Number, default: null},
    err: {type: Number, default: null},
    time: {type: String, default: null}

}, {
    timestamps: true
})

module.exports = mongoose.model('job', jobSchema)