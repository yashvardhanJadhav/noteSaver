const express = require('express')
const router = express.Router()
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');
const getUserID = require('../middleware/getUser')

// REQUEST FOR FETCH ALL NOTES OF A PARTICULAR USER BY "GET" /api/notes/fetchallnotes LOGIN REQUIRED
router.get('/fetchallnotes', getUserID, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.send(notes)
    }
    catch (error) {
        res.status(401).send({ error: "Please Authenticate with valid token" })
    }
})

// THESE IS REQUEST FOR CREATE A NEW NOTES BY "POST" /api/auth/createNote LOGIN REQUIRED
router.post('/createNote', getUserID, [

    body("title").isLength({ min: 2 }),
    body("description").isLength({ min: 5 }),

], async (req, res) => {

    // CHECKING ERROR BY EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // CREATING A NEW NOTE 
        const notes = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        })
        res.send(notes)
    }
    catch (error) {
        res.status(401).send({ error: "Please Authenticate with valid token" })
    }
})


router.put('/updateNote/:id', getUserID, async (req, res) => {

    const { title, description, tag } = req.body
    try {

        // CREATE A NEW NOTE AND UPDATIGN THE GIVEN UPDATES BY REQ.BODY
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // CHECKING WHETHER THE NOTE ID GIVEN BY USER IS VALID IS OR NOT
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" })
        }

        // CHECKING WHETHER THE NOTE GIVEN BY USER IS BELONG TO THAT USER
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Please login with correct credentials" })
        }

        // FINDING THAT NOTE AND UPDATING THE NOTE
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);

    } catch (error) {
        res.status(401).send({ error: "Please Authenticate with valid token" })
    }
})

// THESE IS REQUEST FOR DELETING A EXISTING NOTES BY "delete" /api/auth/deleteNote/:id LOGIN REQUIRED
router.delete('/deleteNote/:id', getUserID, async (req, res) => {
    try {

        // CHECKING WHETHER A NOTE ID GIVE IS USER IS VALID OR NOT
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" })
        }

        // CHECKING WHETHER THE NOTE GIVEN BY USER IS BELONG TO THAT USER
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Please login with correct credentials" })
        }

        // DELETING THE NOTE
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ success: "Note deleted successfully" })
    } catch (error) {
        res.status(401).send({ error: "Please Authenticate with valid token" })
    }
})
module.exports = router