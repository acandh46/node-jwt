'use strict'
const passport = require('passport');
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

module.exports = {
    index: (req, res, next) => {
        res.send('jancok')
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

        Users.findOne({username: username}, (err, user) => {
          if(user){
              return res.status(422).json({
                  errors: {
                      message: "user already registered"
                  }
              })
          }

          const finalUser = new Users({
              username: username
          })

          finalUser.setPassword(password)
          return finalUser.save()
                .then(() => res.json({user: finalUser.toAuthJSON()}))
          
        })
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

        return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
            console.log(err)
            // if(err) {
            //   return next(err);
            // }
        
            // if(passportUser) {
            //   const user = passportUser;
            //   user.token = passportUser.generateJWT();
        
            //   return res.json({ user: user.toAuthJSON() });
            // }
        
            // return status(400).info;
          })(req, res, next);
    }
}