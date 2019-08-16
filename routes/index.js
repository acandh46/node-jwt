'use strict'

const router            = require('express').Router();
const auth              = require('../controller/C_Auth')
const api               = require('../controller/C_Api')
const job               = require('../controller/C_Job')

//index
router.get('/', auth.index)
router.post('/register', auth.register)
router.post('/login', auth.login)

//api
router.get('/api', api.index)


//job
router.get('/job', job.index)

module.exports = router