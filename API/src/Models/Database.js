const { MongoClient } = require('mongodb')

const url = 'mongodb+srv://atish721:kp22tWBmBNI60kMy@atsnode.rrlwcc9.mongodb.net/?retryWrites=true&w=majority'
const dbName = 'NodeCrud'
let db

async function connect() {
    try {
        const client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error(`Error to connect : ${error}`)
        throw error;
    }
}

function getDb() {
    if (!db)
    {
        throw new Error('MongoDB connection not establish!')
    }

    return db
}

module.exports = { connect, getDb }