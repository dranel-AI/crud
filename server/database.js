module.exports = new Promise(async (resolve, reject) => {
  const mongoose = require('mongoose')
  const Schema = mongoose.Schema

  try {
    const DB = process.env.MONGODB

    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const todoSchema = new Schema({
      text: { type: String, required: true },
      isDone: { type: Boolean, default: false }
    })

    resolve(mongoose.model('cruds', todoSchema))
  } catch (error) {
    console.log(error)
  }
})
