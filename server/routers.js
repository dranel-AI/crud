const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const todoModel = await require('./database')
        const doc = await todoModel.find()
        res.status(200).render('index', { doc })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/create', async (req, res) => {
    try {
        const todoModel = await require('./database')
        const { text } = req.body
        const doc = await todoModel({ text }).save()
        res.status(200).json(doc)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/update/:id([a-z0-9]+)', async (req, res) => {
    try {
        const todoModel = await require('./database')
        const doc = await todoModel.findByIdAndUpdate(req.params.id, req.body)
        res.json(doc)
    } catch (error) {
        res.json(error)
    }
})

router.delete('/delete/:id([a-z0-9]+)', async (req, res) => {
    try {
        const todoModel = await require('./database')
        const doc = await todoModel.deleteOne({ _id: req.params.id })
        res.status(200).json(doc)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
