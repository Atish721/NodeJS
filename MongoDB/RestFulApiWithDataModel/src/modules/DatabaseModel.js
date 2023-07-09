const { MongoClient, ObjectId } = require('mongodb')

const mongoDBConnectUrl = 'mongodb+srv://atish721:kp22tWBmBNI60kMy@atsnode.rrlwcc9.mongodb.net/?retryWrites=true&w=majority'
const dbName = 'NodeCrud'
const collectionName = 'admin'

async function connect() {
    try {
        const client = new MongoClient(mongoDBConnectUrl, { useUnifiedTopology: true })
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        return collection
    } catch (error) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

class DataModel {
    constructor(data) {
        this._id = data._id ? new ObjectId(this._id) : new ObjectId()
        this.Name = data.Name
        this.Country = data.Country
        this.Active = data.Active || false
    }

    async save() {
        try {
            const collection = await connect()
            await collection.updateOne({ _id: this._id }, { $set: this }, { upsert: true })
        } catch (error) {
            console.error('Error saving document:', err);
            throw err;
        }
    }

    static async findById(id) {
        try {
            const collection = await connect();
            const document = await collection.findOne({ _id: new ObjectId(id) });
            return document ? new DataModel(document) : null;
        } catch (err) {
            console.error('Error finding document by ID:', err);
            throw err;
        }
    }

    async delete() {
        try {
            const collection = await connect();
            await collection.deleteOne({ _id: this._id });
        } catch (err) {
            console.error('Error deleting document:', err);
            throw err;
        }
    }

    static async findAll() {
        try {
            const collection = await connect();
            const documents = await collection.find({}).toArray();
            return documents.map((doc) => new DataModel(doc));
        } catch (err) {
            console.error('Error finding all documents:', err);
            throw err;
        }
    }
}

module.exports = DataModel;