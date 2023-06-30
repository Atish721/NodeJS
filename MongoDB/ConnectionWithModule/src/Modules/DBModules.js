const { MongoClient, ServerApiVersion } = require('mongodb')

const mongoDBConnectUrl = 'mongodb+srv://atish721:kp22tWBmBNI60kMy@atsnode.rrlwcc9.mongodb.net/?retryWrites=true&w=majority'
const databaseName = 'NodeCrud'

let db

const client = new MongoClient(mongoDBConnectUrl, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

const run = async () => {
    try {
        await client.connect()
        db = client.db(databaseName)
        console.log('MongoDB connected successfully!')
    }
    finally {
        //await client.close()
    }
}

run().catch(console.dir)

// const connect = async () => {
//     try {
//         const client = await MongoClient.connect(mongoDBConnectUrl);
//         db = client.db(databaseName);
//         console.log('Connected to MongoDB successfully!');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//         throw error;
//     }
// }

function getDB() {
    return db;
}

function close() {
    client.close();
    console.log('MongoDB connection closed.');
}


module.exports = {  getDB, close }