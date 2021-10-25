const express = require('express')
const database = require('./database')
const router = express.Router()

router.get('/', async (req, res) => {
  const todo = await database
  const find = await todo.find()
  res.json(find)
})

router.post('/create', async (req, res) => {
  try {
    const todo = await database
    const { text } = req.body
    const item = todo({ text })
    const document = await item.save()
    res.json(document)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
