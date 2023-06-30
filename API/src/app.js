const express = require('express')
const database = require('./Models/Database')
const itemRoutes = require('./Routes/Item')

const app = new express()


const port = process.env.PORT || 8000

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Connect to DB
database.connect()

//Route Home
app.get('/', (request, response) => {
    response.json('Welcome to the my World!')
    response.end()
})

app.use('/items', itemRoutes);

app.listen(port, (a) => {
    console.log(`Server running on http://127.0.0.1:${port}`)
})