'use strict'

const jwt             = require('jsonwebtoken')
const secret          = config.get('secret')


function verifyToken(req, res, next){

    var token = req.header['x-access-token']
    if(!token){
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if(err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    

        req.userId = decoded.id
        next()
    })
}

module.exports = verifyToken