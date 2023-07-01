const { ObjectId } = require('mongodb')
const { getDb } = require('./Database')

const collectionName = 'Items'

class Items {
    constructor(data) {
        this.Name = data.Name,
            this.Category = data.Category,
            this.Price = data.Price,
            this.Quantity = data.Quantity
    }

    static async getAll() {
        const db = getDb()
        const collection = db.collection(collectionName);
        const items = await collection.find({}).toArray()
        return items
    }

    static async getByWhereClause(whereClause) {
        const db = getDb()
        const collection = db.collection(collectionName)
        const item = await collection.findOne(whereClause)
        return item
    }

    async save() {
        const db = getDb()
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(this)
        return result.insertedId
    }

    async update(id) {
        const db = getDb();
        const collection = db.collection(collectionName);
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { Name: this.Name } });
        return result.modifiedCount;
    }

    static async delete(id) {
        const db = getDb();
        const collection = db.collection(collectionName);
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount;
    }
}

module.exports = Items