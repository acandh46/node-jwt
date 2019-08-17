'use strict'

const jwt               = require('jsonwebtoken')
var config              = require('../config/default.json');


function verifyToken(req){

    var token = req.header['x-access-token']
    console.log(req.header)
    // if(!token){
    //     return res.status(403).send({ auth: false, message: 'No token provided.' });
    // }

    // jwt.verify(token, config.secret, (err, decoded) => {
    //     if(err)
    //         return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    

    //     req.userId = decoded.id
    //     next()
    // })
}

module.exports = verifyToken