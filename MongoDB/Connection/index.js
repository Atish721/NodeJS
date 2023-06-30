const http = require('http')
const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()

const port = process.env.PORT || 8000


//Mongo DB connection
const uri = 'mongodb+srv://atish721:kp22tWBmBNI60kMy@atsnode.rrlwcc9.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db('NodeCrud').command({ ping: 1 });
        console.log('Pinged your deployment. You successfully connected to MongoDB!');

    } finally {
        // Ensures that the client will close when you finish/error

        await client.close();
    }
}

run().catch(console.dir);



app.get('/', async (request, response) => {

    await client.connect();
    // specify the DB's name
    const db = client.db('NodeCrud');
    // execute find query
    const adminData = await db.collection('admin').find({}).toArray();

    await client.close();

    // response.send(adminData)
    response.json(adminData)

    response.end()
})

app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}`)
})


