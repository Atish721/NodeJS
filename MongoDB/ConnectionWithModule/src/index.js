// const http = require('http')
const express = require('express')
const { getDB, close } = require('./Modules/DBModules')

const app = express()

const port = process.env.PORT || 8000

// Set up routes that require the database connection
app.get('/', async (req, res) => {
    try {
        const db = getDB();
        const collection = db.collection('admin');
        const documents = await collection.find({}).toArray();

        console.log('All documents:');
 
        res.json(documents);
    } catch (error) {
        console.error('Error retrieving documents:', error);
        res.status(500).send('Error retrieving documents');
    }
});


app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}`)
})

process.on('exit', () => {
    close();
});
