if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expressLayoutes = require('express-ejs-layouts')

const indexRoutes = require('./routes/index')

const port = process.env.PORT || 3000

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayoutes)
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db = mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>{
    console.log('Connected to Mongoose')
})

app.use('/',indexRoutes)

app.listen(port,()=>{
    console.log(`Server running on http://127.0.0.1:${port}`)
})