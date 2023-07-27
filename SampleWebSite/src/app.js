const express = require('express')
const app = express()
const db = require('./db/database')
const path = require('path')
const hbs = require('hbs')

const port = process.env.PORT || 3000

//Paths
const staticPath = path.join(__dirname, '../public')
const templatesPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Middleware
app.use(express.static(staticPath))
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))
app.use('/jq', express.static(path.join(__dirname, '../node_modules/jquery/dist')))
app.set('view engine', 'hbs')
app.set('views', templatesPath)
hbs.registerPartials(partialsPath)


//Routes
app.get('/', (req, resp) => {
    resp.render('index.hbs')
})

app.get('/contact', (req, resp) => {
    resp.render('contact.hbs')
})

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`)
})