const express = require('express');
const router = express.Router(); // Create a router instance
const noteModel = require('../models/Notes');

// Create a new Note
router.post('/notes', (req, res) => {
    // Validate request
    if (!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
        return res.status(400).send({
            message: "All fields (noteTitle, noteDescription, priority) are required"
        });
    }

    // Create a new note based on the request body
    const newNote = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
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
router.get('/notes', (req, res) => {
    // Find all notes in the database
    noteModel.find()
        .then((notes) => {
            res.json(notes);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Could not retrieve notes' });
        });
});

// Retrieve a single Note with noteId
router.get('/notes/:noteId', (req, res) => {
    // Find a note by its ID
    noteModel.findById(req.params.noteId)
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

// Update a Note with noteId
router.put('/notes/:noteId', (req, res) => {
    // Update the note by its ID
    noteModel.findByIdAndUpdate(
        req.params.noteId,
        {
            noteTitle: req.body.noteTitle,
            noteDescription: req.body.noteDescription,
            priority: req.body.priority,
            dateUpdated: Date.now(),
        },
        { new: true }
    )
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

// Delete a Note with noteId
router.delete('/notes/:noteId', (req, res) => {
    // Delete the note by its ID
    noteModel.findByIdAndRemove(req.params.noteId)
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

module.exports = router; // Export the router
