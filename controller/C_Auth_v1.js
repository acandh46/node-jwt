'use strict'
const Users             = require('../models/user')
const bcrypt            = require('bcryptjs')
const jwt               = require('jsonwebtoken')
var config              = require('../config/default.json');


module.exports = {
    index: (req, res, next) => {
        res.send('jancok')
    },
    getUser: (req, res, next) => {
        Users.find({}, (err, user) => {
            res.send(user)
        })
    },
    getId: (req, res, next) => {
        console.log(req.params)
    },
    logout: (req, res, next) => {
        res.status(200).send({auth: false, token: null})
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
          }else{
              const newUser = new Users({
                  username: username, 
                  password: password
              })

              bcrypt.genSalt(10, (err, salt) => {
                  if(err) throw err
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if(err) throw err
                      newUser.password = hash
                      newUser.save().then(user => res.json(user))
                        .catch(err => res.status(403).json(err))
                  })
              })
          }
        //   var hashedPassword = bcrypt.hashSync(password, 8);

        //   Users.create({
        //       username: username, 
        //       password: hashedPassword
        //   }, (err, user) => {
        //       if(err) return res.status(500).send("There was a problem registering the user.")
        //       var token = jwt.sign({id: user._id}, config.secret, {
        //           expiresIn: 86400
        //       })

        //       res.status(200).send(user)
        //   })
          
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

        Users.findOne({username: username}, (err, user) => {
            if (err) return res.status(500).send('Error on the server.');
            if (!user) return res.status(404).send('No user found.');


            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const payload = {
                            id: user._id,
                            name: user.username
                        }

                        jwt.sign(payload, config.secret, {expiresIn: 36000}, (err, token) => {
                            if(err) res.status(500).json({
                                error: "Error signing token", raw: err
                                
                            })
                            res.json({
                                success: true, 
                                token : `Bearer ${token}`
                            })
                        })
                    }else{
                        errors.password = "password incorrent"
                        res.status(400).json(errors)
                    }
                })

            // var token = jwt.sign({ id: user._id }, config.secret, {
            //     expiresIn: 86400 // expires in 24 hours
            // });

            // res.status(200).send({ auth: true, token: token });
        })
    }
}