const express = require('express')
const database = require('./database')
const router = express.Router()

router.get('', async (req, res) => {
    const todo = await database
    const find = await todo.find()
    res.json(find)
})

router.post('/create', async (req, res) => {
    try {
        const todo = await database
        //const queries = { ...req.body, isDone: false }
        //const create = await todo.create(queries)
        res.json(req.body)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
