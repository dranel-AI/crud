const server = require('./server')
const port = process.env.PORT || '80'

server.listen(port, () => {
    const url = `http://localhost:${port}`
    console.table({ url })
})
