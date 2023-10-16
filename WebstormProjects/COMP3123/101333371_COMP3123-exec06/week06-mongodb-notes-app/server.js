const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Note = require('./models/Notes.js');

const DB_URL = "mongodb+srv://raunymartinelli:M1a2r323098080@cluster0.ws44tvx.mongodb.net/f2023_comp3123?retryWrites=true&w=majority";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true, // Add this option
        useFindAndModify: false, // Add this option
    })
    .then(() => {
        console.log('Successfully connected to the database mongoDB Atlas Server');
    })
    .catch((err) => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });


// Create a new Note
app.post('/notes', (req, res) => {
    // Validate request
    if (!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
        return res.status(400).json({
            message: "All fields (noteTitle, noteDescription, priority) are required"
        });
    }

    // Create a new note using the Note model
    const newNote = new Note({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority
    });

    // Save the new note to the database
    newNote.save()
        .then((note) => {
            res.status(201).json(note);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Could not create the note' });
        });
});

// Retrieve all Notes
app.get('/notes', (req, res) => {
    Note.find()
        .then((notes) => {
            res.json(notes);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Could not retrieve notes' });
        });
});

// Retrieve a single Note with noteId
app.get('/notes/:noteId', (req, res) => {
    // Validate request
    if (!req.params.noteId) {
        return res.status(400).json({
            message: "Note ID can not be empty"
        });
    }

    // Find a note by its ID
    Note.findById(req.params.noteId)
        .then((note) => {
            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
            }
            res.json(note);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Could not retrieve the note' });
        });
});

// Update a Note by ID
app.put('/notes/:noteId', (req, res) => {
    // Validate request
    if (!req.params.noteId) {
        return res.status(400).json({
            message: "Note ID can not be empty"
        });
    }

    // Update the note by its ID
    Note.findByIdAndUpdate(req.params.noteId, {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateUpdated: Date.now()
    }, { new: true })
        .then((note) => {
            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
            }
            res.json(note);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Could not update the note' });
        });
});

// Delete a Note by ID
app.delete('/notes/:noteId', (req, res) => {
    // Validate request
    if (!req.params.noteId) {
        return res.status(400).json({
            message: "Note ID can not be empty"
        });
    }

    // Delete the note by its ID
    Note.findByIdAndRemove(req.params.noteId)
        .then((note) => {
            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
            }
            res.json({ message: 'Note deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Could not delete the note' });
        });
});

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});
app.listen(8081, () => {
    console.log('Server is listening on port 8081');
});


