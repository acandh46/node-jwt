'use strict'
const auth              = require('../controller/C_Auth')
const api               = require('../controller/C_Api')
const job               = require('../controller/C_Job')

module.exports = (app) => {
    
    app.get('/', auth.index)
    app.post('/register', auth.register)
    app.post('/login', auth.login)
    app.get('/logout', auth.logout)
    app.get('/user', auth.getUser)


    //loadView
    app.get('/login', auth.loginView)
    app.get('/register', auth.registerView)


    // // app.get('/user', passport.authenticate('jwt', {session: false}), auth.getUser)


    // app.get('/api', api.index)

    // app.get('/job', job.index)
}