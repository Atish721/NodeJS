


'strict mode'
const express = require('express')
const http = require('http')
const hbs = require('hbs')
const path = require('path')

const app = express()
const geoLocationModule = require('./modules/geoLocationModule')
// const geolocation = require('geolocation-utils')

const port = process.env.PORT || 8000


//Set absolute path
const homePagePath = path.join(__dirname, '../public')
const templatesPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Build-in middleware
app.use(express.static(homePagePath))

//Set view engine
app.set('view engine', 'hbs')
app.set('views', templatesPath)

hbs.registerPartials(partialsPath)

//Routes
app.get('/', (request, response) => {
  response.render('index', { userName: 'Atish' })
})

app.get('/index', (request, response) => {
  response.render('index', { userName: 'Atish' })
})

app.get('/about', (request, response) => {
  response.render('about', { userName: 'Atish' })
})

app.get('/we_do', (request, response) => {
  response.render('we_do', { userName: 'Atish' })
})

app.get('/portfolio', (request, response) => {
  response.render('portfolio', { userName: 'Atish' })
})


app.get('/weather', async (request, response) => {

  let cityName = ''
  let apiData = ''

  if (request.query.city_name == undefined) {
    let ipAddress = await geoLocationModule.IpAddress()
    cityName = await geoLocationModule.cityName(ipAddress)
  }
  else {
    cityName = Buffer.from(request.query.city_name, 'base64').toString('utf8');
  }

  const option = {
    hostname: 'api.openweathermap.org',
    path: `/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=d19409cae10007fd2eff2d4be3407fa6&units=metric`,
    method: 'GET',
  }

  const apiRequest = http.request(option, (apiResponse) => {

    apiResponse.on('data', (chunk) => {
      apiData += chunk
    })

    apiResponse.on('end', () => {
      let objectData = JSON.parse(apiData)
      response.render('weather', { 'weatherData': objectData })
    })
  })

  apiRequest.on('error', (err) => {
    response.statusCode = 500
    response.writeHead(response.statusCode, 'Error', { 'Content-Type': 'application/json' });
    response.write('Internal Server Error.')
    response.end()
  })

  apiRequest.end()
})

app.get('/*', (request, response) => {
  response.status(400).render('error', { errorCode: '404', errorMessage: 'Oops! page not found.' })

  // response.statusCode = 404;
  // response.writeHead(response.statusCode, 'Error', { 'Content-Type': 'application/json' });
  // response.write('Not Found.')
  // response.end()

})

app.get('/index/*', (request, response) => {
  response.render('error', { errorCode: '404', errorMessage: 'Oops! page not found.' })
})

app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`)
})