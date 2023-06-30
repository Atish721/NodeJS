const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

const mongoDBConnectUrl = 'mongodb+srv://atish721:kp22tWBmBNI60kMy@atsnode.rrlwcc9.mongodb.net/?retryWrites=true&w=majority'
const dbName = 'NodeCrud'

let db = null
let client = null

const connectToDatabase = async () => {
    try {
        client = await MongoClient.connect(mongoDBConnectUrl, { useUnifiedTopology: true })
        db = await client.db(dbName)
        console.log('Connected to MongoDB.')
    } catch (error) {
        console.log('Error  connecting to MongoDB : '.error)
        throw error
    }
}

const getDatabase = () => {
    if (!db) {
        throw new Error('Database not connected.')
    }
    else {
        return db
    }
}

const close = () => {
    client.close();
    console.log('MongoDB connection closed.');
}

const createDocument = async(collectionName, document) => {
    const collection = db.collection(collectionName);
    return await collection.insertOne(document);
}

const getAlldocument = async (collectionName, query) => {
    const collection = db.collection(collectionName)
    return await collection.find(query).stream().toArray();
}

const getDocument = async (collectionName, whereClause) => {
    const collection = db.collection(collectionName)
    return await collection.findOne(whereClause)
}

const updateDocument = async (collectionName, whereClause, updateQuery) => {
    const collection = db.collection(collectionName)
    return await collection.updateOne(whereClause, { $set: updateQuery })
}

const updateAllDocument = async (collectionName, whereClause, updateQuery) => {
    const collection = db.collection(collectionName)
    return await collection.updateMany(whereClause, { $set: updateQuery })
}

const deleteDocument = async (collectionName, whereClause) => {
    const collection = db.collection(collectionName)
    return await collection.deleteOne(whereClause)
}

module.exports = { connectToDatabase, getDatabase, close, createDocument, getAlldocument, getDocument, updateDocument, updateAllDocument, deleteDocument, ObjectId }