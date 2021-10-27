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

        res.status(200).json({
            status: 200,
            message: 'successfully added!',
            doc,
        })
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message })
    }
})

router.put('/update/:id([a-z0-9]+)', async (req, res) => {
    try {
        const todoModel = await require('./database')
        const doc = await todoModel.findByIdAndUpdate(req.params.id, req.body)

        res.status(200).json({
            status: 200,
            message: 'successfully updated!',
            doc,
        })
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message })
    }
})

router.delete('/delete/:id([a-z0-9]+)', async (req, res) => {
    try {
        const todoModel = await require('./database')
        const doc = await todoModel.deleteOne({ _id: req.params.id })

        res.status(200).json({
            status: 200,
            message: 'successfully deleted!',
            doc,
        })
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message })
    }
})

module.exports = router
