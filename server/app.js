const express = require('express')
const mongoose = require('mongoose')
const app = express()

// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('json spaces', 2)

// routers
const routers = require('./routers')
app.use(routers)

module.exports = app
