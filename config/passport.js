'use strict'
const {Strategy, ExtractJwt}    = require('passport-jwt');
const config                    = require('../config/default.json')
const Users                     = require('../models/user')
const LocalStrategy             = require('passport-local').Strategy;


module.exports = (passport) => {
    passport.serializeUser( (user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((user, done) => {
        Users.findById(user.id).then( (user) => {
            if(user){
                done(null, user)
            }
        }).catch(err => {
            console.log(err)
        })
    })


    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, username, password, done) => {
        process.nextTick( ()=> {
            Users.findOne({username: username}, (err, user) => {
                if(err){
                    console.log(err)
                    return done(err)
                }

                if(user){
                    console.log('signupMessage', 'That email is already taken.');
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
                }else{
                    const newUser = new Users({
                        username: username
                    })

                    newUser.password = newUser.generateHash(password)
                    
                    // console.log(newUser)

                    newUser.save().then((dbUser) => {
                        return done(null, dbUser)
                    }).catch((err) => {
                        console.log(err)
                    })
                }


            })
        })
    }))

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, username, password, done) => {

        Users.findOne({username, username}, (err, user) => {
            if(!user){
                console.log('no user found')
                return done(null, false, req.flash('loginMessage', 'No User found'))
            }

            if(user && !user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Wrong password'))
            }

            return done(null, user)
        })
    }))
}