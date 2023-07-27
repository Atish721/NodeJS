const express = require('express')
const route = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminLayout = '../views/layouts/admin'

const jwtSecret = process.env.JWT_SECRET


//get check login
function authMiddleware(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.userId = decoded.userId
        next()

    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' })
    }

}



//get admin dashboard
route.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const data = await Post.find()
        res.render('admin/dashboard', { data, layout: adminLayout })
    } catch (error) {
        console.log(error)
    }
})


//get admin login
route.get('/admin', (req, res) => {
    try {
        res.render('admin/index', { layout: adminLayout })
    } catch (error) {
        console.log(error)
    }
})

//post admin login
route.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username: username })

        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' })
        }


        const token = jwt.sign({ userId: user._id }, jwtSecret)
        res.cookie('token', token, { httpOnly: true })

        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
    }
})


//post admin register
route.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body
        const hashPassword = await bcrypt.hash(password, 10)


        try {
            const user = await User.create({
                username: username,
                password: hashPassword
            })
            console.log(user)
        } catch (error) {
            console.log(`Error : ${error.code} User not created`)
        }

        res.status(201).json(user)
        // res.render('admin/index',{layout:adminLayout})
    } catch (error) {
        console.log(error)
    }
})


//get admin create new post
route.get('/add-post', authMiddleware, async (req, res) => {
    try {
        const data = await Post.find()
        res.render('admin/add-post', { data, layout: adminLayout })
    } catch (error) {
        console.log(error)
    }
})

//post admin create new post
route.post('/add-post', authMiddleware, async (req, res) => {

    try {
        const newPost = new Post({
            title: req.body.title,
            body: req.body.body
        })

        await Post.create(newPost)
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
    }
})

//get admin create new post
route.get('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
        const data = await Post.findOne({ _id: req.params.id })
        res.render('admin/edit-post', {
            data,
            layout: adminLayout
        })

    } catch (error) {
        console.log(error)
    }
})

//put admin create new post
route.put('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        })

        res.redirect(`/edit-post/${req.params.id}`)

    } catch (error) {
        console.log(error)
    }
})

//delete admin create new post
route.delete('/delete-post/:id', authMiddleware, async (req, res) => {
    try {
        await Post.deleteOne({_id:req.params.id})

        res.redirect(`/dashboard`)

    } catch (error) {
        console.log(error)
    }
})

//get admin logout
route.get('/logout', async (req, res) => {
    try {
        res.clearCookie('token')

        res.redirect(`/`)

    } catch (error) {
        console.log(error)
    }
})

//get about
route.get('/about', (req, res) => {
    try {
        res.render('admin/about', { layout: adminLayout })
    } catch (error) {
        console.log(error)
    }
})

//get contact
route.get('/contact', (req, res) => {
    try {
        res.render('admin/contact', { layout: adminLayout })
    } catch (error) {
        console.log(error)
    }
})

module.exports = route
