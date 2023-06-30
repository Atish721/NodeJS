const express = require('express')
const app = express()

const path = require('path')

const port = 3000

let staticPath=path.join(__dirname,'/public')

console.log(staticPath)

app.use(express.static(staticPath))//Build-in meddleware

app.get('/',(request,response)=>{
    response.status(200).write('Home Page')
    response.send()
})

app.get('/home',(request,response)=>{
    response.status(200).write('Home Page')
    response.send()
})

app.get('/about',(request,response)=>{
    response.status(200).write('About Page')
    response.send()

})

app.get('/json',(request,response)=>{
    let arrayObject = [{name:'abc',age:29},{name:'xyz',age:22},{name:'pqr',age:21}]
    response.json(arrayObject)
})


app.listen(port,()=>{
    console.log(`Server runnin on http://127.0.0.1:${port}`)
})