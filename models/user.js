'use strict'
const mongoose      = require('mongoose')
const bcrypt        = require('bcrypt')
const { Schema } = mongoose


const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    typeUser: {type: String, default: 'free'},
    totalCheck: {type: Number, default: null},
    status: {type: Boolean, default: false}

}, {
    timestamps: true
})

UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('Users', UserSchema);