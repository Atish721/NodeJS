const http = require('http')
const server = http.createServer()
const fs = require('fs')

server.on('request',(request,response)=>{
    const readStream = fs.createReadStream('input.txt')

    readStream.pipe(response)
})

server.listen('8000','127.0.0.1',()=>{
    console.log('Server started')
})