const http = require('http')
const server = http.createServer()

const fs = require('fs')
const indexFile = fs.readFileSync(`${__dirname}/index.html`, 'utf-8')

let port = '8006'

server.on('request', (request, response) => {

    if (request.url == '/') {

        const options = {
            hostname: 'www.zenquotes.io',
            path: '/api/quotes/random',
            method: 'GET',
        }

        const apiRequest = http.request(options, (apiResponse) => {

            let apiData = ''
            apiResponse.on('data', (chunk) => {
                apiData += chunk
            })

            apiResponse.on('end', () => {

                response.writeHead(apiResponse.statusCode, 'Ok', { 'Content-Type': 'text/html' });
                response.write(apiData)
                console.log(apiData)
                response.end()

            })
        })

        apiRequest.on('error', (err) => {

            response.statusCode = 500
            response.writeHead(response.statusCode, 'Error', { 'Content-Type': 'application/json' });
            response.write(`Internal Server Error. ${err.message}`)
            response.end()
        })

        apiRequest.end()
    }
    else {
        response.statusCode = 404;
        response.writeHead(response.statusCode, 'Error', { 'Content-Type': 'application/json' });
        response.write('Not Found.')
        response.end()
    }
})

server.listen(port, '127.0.0.1', () => {
    console.log(`Server running on http://127.0.0.1:${port}`)
})
