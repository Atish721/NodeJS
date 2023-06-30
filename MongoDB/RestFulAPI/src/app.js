const express = require('express')
const { connectToDatabase, getDatabase, close, createDocument, getAlldocument, getDocument, updateDocument, updateAllDocument, deleteDocument, ObjectId } = require('./Modules/DBConnectionModule')

const app = express()
const port = process.env.PORT || 8000

//Middleware
app.use(express.json())

//Connect to MongoDB
connectToDatabase()
    .then(() => {
        //Start server
        app.listen(port, () => {
            console.log(`Server is running on http://127.0.0.1:${port}`)
        })
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err)
    })

//Validation
function validateData(request, response, next) {

    const { Name, Country, Active } = request.body;

    if (!Name || typeof Name !== 'string') {
        return response.status(400).json({ error: 'Name is required and must be a string' })
    }

    if (!Country || typeof Country !== 'string') {
        return response.status(400).json({ error: 'Country is required and must be a string' })
    }
    
    if (typeof Active !== 'boolean') {

        return response.status(400).json({ error: 'Active is required and must be a boolean' })

    }

    next()
}


//Routes
//Home page
app.get('/', (request, response) => {
    try {
        response.status(200).send('Welcome to the RESTful API.');
    } catch (error) {
        console.error('Error accessing database:', error);
        response.status(500).send('Error accessing database');
    }
    response.end()
})

// Create a document
app.post('/api/add_user', validateData, (request, response) => {
    try {

        const collectionName = 'admin'

        createDocument(collectionName, request.body)
            .then((result) => {
                response.status(200).json(result)
            })
            .catch((err) => {
                console.error('Error creating document:', err)
                response.status(500).json({ Message: 'Document not inserted.', Error: err })
            });
    } catch (error) {
        console.error('Error accessing database:', error)
        response.status(500).json({ Message: 'Document not inserted.', Error: 'Error accessing database.' })
    }
});


//Read all documents
app.get('/api/get_all_users', (request, response) => {

    try {
        const collectionName = 'admin'
        const query = {}
        getAlldocument(collectionName, query)
            .then((result) => {
                if (result) {
                    response.status(200).json(result)
                }
                else {
                    response.status(404).json({ Message: 'Document not found.', Error: 'Collection is empty.' })
                }
            })
            .catch((error) => {
                console.error('Error reading document:', error)
                response.status(500).json({ Message: 'Document not read.', Error: error })
            })
    } catch (error) {
        console.error('Error accesing document:', error)
        response.status(500).json({ Message: 'Document not read.', Error: 'Error accessing database.' })
    }
})

//Read using where clause
app.get('/api/user/:id', (request, response) => {
    try {
        const collectionName = 'admin'
        const whereCluase = { _id: new ObjectId(request.params.id) }

        getDocument(collectionName, whereCluase)
            .then((result) => {
                if (result)
                    response.status(200).json(result)
                else
                    response.status(404).json({ Message: 'Document not found', Error: 'ID don\t match to document' })
            })
            .catch((error) => {
                console.log(error)
                response.status(500).json({ Message: 'Document not read.', Error: 'Error accessing database.' })
            })

    } catch (error) {
        console.error('Error accesing document:', error)
        response.status(500).json({ Message: 'Document not read.', Error: 'Error accessing database.' })
    }
})

//Update one document
app.put('/api/update', (request, response) => {
    try {
        const collectionName = 'admin'
        const updateQuery = { Name: request.body.Name, Country: request.body.Country }
        const whereClause = { _id: new ObjectId(request.body.id) }

        updateDocument(collectionName, whereClause, updateQuery)
            .then((result) => {
                if (result)
                    response.status(200).json(result)
                else
                    response.status(404).json({ Message: 'Document not found.', Error: 'ID don\t match to document' })
            })
            .catch((error) => {
                console.log(error)
                response.status(500).json({ Message: 'Document not read.', Error: 'Error accessing database.' })
            })

    } catch (error) {
        console.error('Error accesing document:', error)
        response.status(500).json({ Message: 'Document not updated.', Error: 'Error accessing database.' })
    }
})

//Update all document
app.put('/api/all_update', (request, response) => {
    try {
        const collectionName = 'admin'
        const updateQuery = { Country: request.body.Status }
        const whereClause = { Name: request.body.Name }

        updateAllDocument(collectionName, whereClause, updateQuery)
            .then((result) => {
                if (result)
                    response.status(200).json(result)
                else
                    response.status(404).json({ Message: 'Document not found.', Error: 'ID don\t match to document' })
            })
            .catch((error) => {
                console.log(error)
                response.status(500).json({ Message: 'Document not read.', Error: 'Error accessing database.' })
            })

    } catch (error) {
        console.error('Error accesing document:', error)
        response.status(500).json({ Message: 'Document not updated.', Error: 'Error accessing database.' })
    }
})

app.delete('/api/delete', (request, response) => {
    try {
        const collectionName = 'admin'
        const whereClause = { _id: new ObjectId(request.body.id) }

        deleteDocument(collectionName, whereClause)
            .then((result) => {
                if (result)
                    response.status(200).json(result)
                else
                    response.status(404).json({ Message: 'Document not deleted.', Error: 'ID don\t match to document' })
            })
            .catch((error) => {
                console.log(error)
                response.status(500).json({ Message: 'Document not deleted.', Error: 'Error accessing database.' })
            })

    } catch (error) {
        console.error('Error accesing document:', error)
        response.status(500).json({ Message: 'Document not deleted.', Error: 'Error accessing database.' })
    }
})



// Gracefully close the MongoDB connection on process exit
process.on('exit', () => {
    close();
});