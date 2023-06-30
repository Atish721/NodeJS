const { ObjectId } = require('mongodb')
const { getDb } = require('./Database')

const collectionName = 'Items'

class Items{
    constructor(data)
    {
        this.Name=data.Name,
        this.Category=data.Category,
        this.Price=data.Price,
        this.Quantity=data.Quantity
    }

    static async getAll()
    {
        const db = getDb()
        const collection = db.collection(collectionName);
        const items = await collection.find({}).toArray()
        return items
    }
}

module.exports = Items