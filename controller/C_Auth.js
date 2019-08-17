'use strict'
const Users             = require('../models/user')
const bcrypt            = require('bcryptjs')
const jwt               = require('jsonwebtoken')
const passport           = require('passport')
var config              = require('../config/default.json');

module.exports = {
    index: (req, res, next) => {
        if(req.isAuthenticated()){
            var user = {
                id: req.session.passport.user,
                isLoggedin: req.isAuthenticated()
            }
            res.send('cok', user)
        }else{
            res.redirect('/login')
        }
    },

    loginView: (req, res, next) => {
        res.send('ini login view')
    },

    registerView: (req, res, next) => {
        res.render('account'); 
    },

    getUser: (req, res, next) => {
        console.log("%%%%%%%%% is logged in", req.isAuthenticated());

        console.log(req.session.passport)
        Users.find({}, (err, user) => {
            res.send(user)
        })
    },
    register: (req, res, next) => {
        const { body: { username, password } } = req;
        if(!username){
            return res.status(422).json({
                errors:{
                    username: 'is required'
                }
            })
        }

        if(!password){
            return res.status(422).json({
                errors:{
                    password: 'is required'
                }
            })
        }
        passport.authenticate('local-signup', (err, user, info) => {
            // console.log("info", info);
            if (err) {
                // console.log("passport err", err);
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
            if (! user) {
                // console.log("user error", user);
                return res.send({ success : false, message : 'authentication failed' });
            }

            req.login(user, loginErr => {
                if (loginErr) {
                    console.log("loginerr", loginerr)
                    return next(loginErr);
                }
                console.log('redirecting....');
        
                res.cookie('username', user.username);
                res.cookie('user_id', user._id );
                return res.redirect("/user");
            })
        })(req, res, next);

    },
    login: (req, res, next) => {
        const { body: { username, password } } = req;
        if(!username){
            return res.status(422).json({
                errors:{
                    username: 'is required'
                }
            })
        }

        if(!password){
            return res.status(422).json({
                errors:{
                    password: 'is required'
                }
            })
        }


        passport.authenticate('local-login', (err, user, info) => {
            console.log("\nuser", user)
            if (err) {
                console.log("passport err", err);
                return next(err); // will generate a 500 error
            }

            if (!user) {

                return res.send({ success : false, message : 'authentication failed'});
            }

            req.login(user, loginErr => {
                if (loginErr){
                    console.log("loginerr", loginErr)
                    return next(loginErr);
                }

                res.cookie('username', user.username)
                res.cookie('user_id', user._id)

                return res.json(true)
            })
        
        })(req, res, next);
    },
    logout: (req, res, next) => {
        req.session.destroy((err) => {
            req.logout()
            res.clearCookie('user_sid');
            res.clearCookie('username');
            res.clearCookie('user_id');
            res.redirect('/');    
        })
    }
}