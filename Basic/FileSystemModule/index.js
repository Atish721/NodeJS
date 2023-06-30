const http = require('http')
const fs = require('fs')

const server = http.createServer()

server.on('request', (request, response) => {
    fs.readFile('input.txt', 'utf-8', (err, data) => {
        if (err)
        {
            console.error()
            response.write(err.message)
            response.end()            
            return
        }

        response.write(data.toString())
        response.end()
    })

})

server.listen('8000', '127.0.0.1', (err) => {
    if (err)
        return console.log(err)
    console.log('server started')
})