const express = require('express')
const app = express()

// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('json spaces', 2)

//static folder
app.use(express.static('public'))

// view engine
app.set('view engine', 'ejs')

// routers
const routers = require('./routers')
app.use(routers)

module.exports = app
