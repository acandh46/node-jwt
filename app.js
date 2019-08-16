'use strict'
const express           = require('express')
const path              = require('path')
const bodyParser        = require('body-parser')
const session           = require('express-session')
const cors              = require('cors')
const mongoose          = require('mongoose')
const errorHandler      = require('errorhandler')
const morgan            = require('morgan')
const config            = require('config')
// const passport          = require('passport')

mongoose.promise        = global.Promise

const app               = express()
const isProduction      = process.env.NODE_ENV === 'production' 
const port              = process.env.PORT || 3333
const dbConfig          = config.get('database')

const connectOption     = {
    keepAlive: true, 
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
    useFindAndModify: false,
}

mongoose.connect(dbConfig, connectOption, (err, db) => {
    if(err) throw err
    console.log('Connnected to database')
})

require('./auth/passport')

// app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'kentodkuda',
    cookie: {
        maxAge: 60000 
    },
    resave: false, 
    saveUninitialized: false
}))

// app.use(passport.initialize())
app.use(require('./routes'));

if(!isProduction){
    app.use(errorHandler())
}

// app.use('/auth', require('./controller/C_Auth'))


// if(!isProduction){
//     app.use((req, res, err) => {
//         res.status(err.status || 500)

//         res.json({
//             errors: {
//                 message: err.message, 
//                 error: err
//             }
//         })
//     })
// }



// app.use((err, req, res) => {
//     res.status(err.status || 500)

//     res.json({
//         errors: {
//             message: err.message,
//             error: {}
//         }
//     })
// })

app.listen(port, () => console.log('Server running on port:', port))