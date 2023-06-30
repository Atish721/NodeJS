const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
    response.send('Welcome to the my world!')
})

app.get('/name', (request, response) => {
    response.send('Welcome to the Name page!')
})

app.listen(port, () => {
    console.log(`Server running on part http://127.0.0.1:${port}`)
})