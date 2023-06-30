const express = require('express');
const DataModel = require('./modules/DatabaseModel');

const app = express();
const port = process.env.PORT = 8000;

// Middleware
app.use(express.json());

//Read all documents
app.get('/api/get', async (req, res) => {
  try {
    const documents = await DataModel.findAll();
    res.json(documents);
  } catch (err) {
    console.error('Error retrieving documents:', err);
    res.status(500).send('Error retrieving documents');
  }
});

// Create/update a document
app.post('/api/inser_update', async (req, res) => {
  try {
    const data = req.body;
    const document = new DataModel(data);
    await document.save();
    res.json({ _id: document._id });
  } catch (err) {
    console.error('Error saving document:', err);
    res.status(500).send('Error saving document');
  }
});

// Retrieve a document by ID
app.get('/api/get_document/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const document = await DataModel.findById(id);
    if (document) {
      res.json(document);
    } else {
      res.status(404).send('Document not found');
    }
  } catch (err) {
    console.error('Error retrieving document:', err);
    res.status(500).send('Error retrieving document');
  }
});

// Delete a document
app.delete('/api/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const document = await DataModel.findById(id);
    if (document) {
      await document.delete();
      res.send('Document deleted successfully');
    } else {
      res.status(404).send('Document not found');
    }
  } catch (err) {
    console.error('Error deleting document:', err);
    res.status(500).send('Error deleting document');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
