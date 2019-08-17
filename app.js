'use strict'
const express           = require('express')
const path              = require('path')
const bodyParser        = require('body-parser')
const cookieParser      = require('cookie-parser')
const flash             = require('connect-flash')
const session           = require('express-session')
const cors              = require('cors')
const mongoose          = require('mongoose')
const expresHBs         = require('express-handlebars')
const morgan            = require('morgan')
const passport          = require('passport')
var config              = require('./config/default.json')
const app               = express()
const port              = process.env.PORT || 3333
mongoose.promise        = global.Promise

const connectOption     = {
    keepAlive: true, 
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
    useFindAndModify: false,
}

mongoose.connect(config.database, connectOption, (err, db) => {
    if(err) throw err
    console.log('Connnected to database')
})

//configure passport
require('./config/passport')(passport)

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.engine("handlebars", expresHBs({defaultLayout: "main"}));
app.set("view engine","handlebars");
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    key: 'user_sid',
    secret: 'ajenngnjakdjakjdahudhf91831801938019808098183791',
    cookie: {
        maxAge: 60000 
    },
    resave: false, 
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session());
app.use(flash())

require('./routes')(app, passport)

app.listen(port, () => console.log('Server running on port:', port))