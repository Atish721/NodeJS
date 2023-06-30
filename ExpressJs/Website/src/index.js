'strict mode'

const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')

const port = 3001

//Set absolute path
const homePagePath = path.join(__dirname,'../public')
const templatesPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Build-in middleware
app.use(express.static(homePagePath))

//Set view engine
app.set('view engine','hbs')
app.set('views',templatesPath)

hbs.registerPartials(partialsPath)

app.get('/',(request,response)=>{
    response.render('index',{userName:'Atish'})
})

app.get('/index',(request,response)=>{
    response.render('index',{userName:'Atish'})
})

app.get('/about',(request,response)=>{
    response.render('about',{userName:'Atish'})
})

app.get('/we_do',(request,response)=>{
    response.render('we_do',{userName:'Atish'})
})

app.get('/portfolio',(request,response)=>{
    response.render('portfolio',{userName:'Atish'})
})

app.get('/contact',(request,response)=>{
    response.render('contact',{userName:'Atish'})
})

app.get('*',(request,response)=>{
    response.render('error',{errorCode:'404',errorMessage:'Oops! page not found.'})
})


app.listen(port,()=>{
    console.log(`Server running on http://127.0.0.1:${port}`)
})