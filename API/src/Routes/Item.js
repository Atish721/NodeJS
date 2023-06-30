const express = require('express')
const router = express.Router()
const Items = require('../Models/Items')

//Get all items
router.get('/get_all', async (request, response) => {
    try {
        const items = await Items.getAll()
        if(items.lenght>0)
        {
            response.status(200).json(items)
        }            
        else
        {
            response.status(404).json({Message:'Items not found.'})
        }
    }
    catch (error) {
        console.error('Error retrieving items:', error);
        response.status(500).json({ error: 'Error retrieving items' });
    }
})

module.exports = router