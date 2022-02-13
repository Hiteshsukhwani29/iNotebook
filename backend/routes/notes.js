const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json([notes]);
    }
    catch {
        res.status(500).send('Internal Server Error');
    }
});

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Enter a valid decsription').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const {title,description,tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savenote = await note.save();
        res.json(savenote);
    }
    catch(error) {
        res.status(500).send(error);
    }
})

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const {title,description,tag} = req.body;
        
        const updatednote = {};
        if(title){updatednote.title = title};
        if(description){updatednote.description = description};
        if(tag){updatednote.tag = tag};

        let note = await Note.findById(req.params.id);
        if(!note){ return res.status(404).send('Not found')}
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("you don't have permission to modify")
        }

        note = await Note.findByIdAndUpdate(req.params.id,{$set:updatednote},{new:true});

        res.json(note);
    }
    catch(error) {
        res.status(500).send(error);
    }
})

module.exports = router