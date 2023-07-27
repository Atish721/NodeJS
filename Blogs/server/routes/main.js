const express = require('express')
const route = express.Router()
const Post = require('../models/Post')

//Home
route.get('/', async (req, res) => {

    try {
        let perPage = 5
        let page = req.query.page || 1

        const data = await Post.aggregate([
            {
                $sort: { createdAt: -1 }
            }
        ])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec()

        const count = await Post.count()
        const nextPage = parseInt(page) + 1
        const hasNextPage = nextPage <= Math.ceil(count / perPage)

        res.render('index', {
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        })
    }
    catch (error) {
        console.log(error)
    }
})

//Get Post with id
route.get('/post/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await Post.find({ _id: id })
        // console.log(data[0])
        res.render('post', {
            data,
            currentRoute: `/post/${id}`
        })
    } catch (error) {
        console.log(error)
    }
})


//POST search term
route.post('/search', async (req, res) => {
    try {

        let searchTerm = req.body.searchTerm
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '')

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
            ]
        })

        res.render('search', {
            data,
            currentRoute: `/search`
        })
    } catch (error) {
        console.log(error)
    }
})

//About
route.get('/about', async (req, res) => {
    try {
        res.render('about', {
            currentRoute: `/about`
        })
    }
    catch (error) {
        console.log(error)
    }
})

//About
route.get('/contact', async (req, res) => {
    try {
        res.render('contact', {
            currentRoute: `/contact`
        })
    }
    catch (error) {
        console.log(error)
    }
})



module.exports = route