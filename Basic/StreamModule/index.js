const http = require('http')
const server = http.createServer()
const fs = require('fs')

server.on('request', (request, response) => {
    const readStream = fs.createReadStream('input.txt')

    readStream.on('error', (err) => {
        response.write(err.message)
        response.end();
        return
    })

    readStream.on('data', (chunkData) => {

        response.write(chunkData)
    })

    readStream.on('end', () => {
        response.end()
    })


})

server.listen('8001', '127.0.0.1', (err) => {
    if (err)
        return console.log(err)
    console.log('server started')
})