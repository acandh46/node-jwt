'use strict'

const mongoose      = require('mongoose')

const { Schema } = mongoose


const apiSchema = new Schema({
    apiurl: {type: String, default: null},
    type: {type: String, default: null},
    status: {type: Boolean, default: false},
    used: {type: Number, default: null}

}, {
    timestamps: true
})

module.exports = mongoose.model('api', apiSchema)