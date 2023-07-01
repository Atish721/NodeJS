const express = require('express')
const router = express.Router()
const Items = require('../Models/Items')

//Validation
const itemValidation = (request, response, next) => {
    const { Name, Category, Price, Quantity } = request.body;

    if (!Name || typeof Name !== 'string') {
        return response.status(400).json({ error: 'Name is required and must be a string' })
    }

    if (!Category || typeof Category !== 'string') {
        return response.status(400).json({ error: 'Category is required and must be a string' })
    }

    if (typeof Price !== 'number') {
        if (parseInt(Price) < 0) {
            return response.status(400).json({ error: 'Price must be greater than 0' })
        }

        return response.status(400).json({ error: 'Price is required and must be a number' })
    }

    if (typeof Quantity !== 'number') {
        if (parseInt(Quantity) < 0) {
            return response.status(400).json({ error: 'Quantity must be greater than 0' })
        }

        return response.status(400).json({ error: 'Quantity is required and must be a number' })
    }
    next()
}

//Get all items
router.get('/get_all', async (request, response) => {
    try {
        const items = await Items.getAll()

        if (items.length > 0) {
            response.status(200).json(items)
        }
        else {
            response.status(404).json({ Message: 'Items not found.' })
        }
    }
    catch (error) {
        console.error('Error retrieving items:', error);
        response.status(500).json({ error: 'Error retrieving items' });
    }
})

//Get item by where clause
router.post('/get', async (request, response) => {
    try {
        const whereClause = request.body;
        const item = await Items.getByWhereClause(whereClause);
        if (item) {
            response.status(200).json(item);
        } else {
            response.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error('Error retrieving item:', error);
        res.status(500).json({ error: 'Error retrieving item' });
    }
});


//Insert item 
router.post('/insert', itemValidation, async (request, response) => {
    try {
        const newItem = new Items(request.body)
        const existingItem = await Items.getByWhereClause({ Name: request.body.Name })

        if (existingItem) {
            response.status(200).json({ Message: 'Item with the same name already exists', Data: existingItem })
        }
        else {

            const insertId = await newItem.save()
            response.status(200).json({ Message: 'Item saved', Data: { _id: insertId } })

        }

    } catch (error) {
        console.error('Error on save item:', error);
        response.status(500).json({ error: 'Error save items' });
    }
})


//Update item 
router.put('/update', async (request, response) => {
    try {
        const updatedItem = new Items(request.body)
        const existingItem = await Items.getByWhereClause({ Name: request.body.Name })
        if (existingItem && existingItem._id.toString() !== request.body.Id) {
            response.status(200).json({ Message: 'Item with the same name already exists', Data: existingItem })
        }
        else {

            const modifiedCount = await updatedItem.update(request.body.Id)
            if (modifiedCount > 0) {
                response.status(200).json({ Message: 'Item updated' })
            } else {
                response.status(404).json({ error: 'Item not found' });
            }

        }

    } catch (error) {
        console.error('Error on update item:', error);
        response.status(500).json({ error: 'Error update items' });
    }
})


// Delete an item
router.delete('/delete', async (request, response) => {
    try {
        const itemId = request.body.Id
        const deletedCount = await Items.delete(itemId)
        if (deletedCount > 0) {
            response.status(200).json({ Message: 'Item deleted successfully' })
        } else {
            response.status(404).json({ error: 'Item not found' });
        }

    } catch (error) {
        console.error('Error on deleting item:', error);
        response.status(500).json({ error: 'Error deleting items' });
    }
})

module.exports = router