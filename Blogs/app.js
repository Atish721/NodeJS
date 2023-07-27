if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const connectDB = require('./server/config/db')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const isActiveRoute = require('./server/helpers/routeHelpers')

const mainRoutes = require('./server/routes/main')
const adminRoutes = require('./server/routes/admin')

const port = process.env.PORT || 300

//Connect to DB
connectDB()

//Paths
const staticPath = path.join(__dirname, 'public')
const layoutPath = path.join(__dirname, 'views/layouts/main')

//Middleware
app.use(express.static(staticPath))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride('_method'))

app.use(session({
    secret: 'ats',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}))

//Templating engine
app.use(expressLayout)
app.set('layout', layoutPath)
app.set('view engine', 'ejs')

//Global varibles
app.locals.isActiveRoute=isActiveRoute

//Routes
app.use('/', mainRoutes)
app.use('/', adminRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`)
})