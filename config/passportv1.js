'use strict'
const {Strategy, ExtractJwt}    = require('passport-jwt');
const config                    = require('../config/default.json')
const Users                     = require('../models/user')


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
}

module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            console.log(payload)
            Users.findById(payload.id)
                .then(user => {
                    if(user){
                        return done(null, {
                            id: user.id, 
                            username: user.username
                        })
                    }
                    return done(null, false);
                }).catch(err => console.log(err))
        })
    )
}