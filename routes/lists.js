const express = require('express');
const router = express.Router();
const List = require('../models/List');
const { protect } = require('../middleware/auth');


// GET api/lists  [Get all lists from logged in user]
router.get('/', protect, async (req, res) => {
    try {
        const lists = await List.find({ user: req.user.id });
        res.status(200).json(lists);
    } catch (err) {
        console.log(err);
    }
})


// GET api/lists/:id  [Get a single list]
router.get('/:id', async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        res.status(200).json(list);
    } catch (err) {
        console.log(err);
    }
})


// POST api/lists  [Save a new list]
router.post('/', protect, async (req, res) => {
    try {
        const reqList = { 
            title: req.body.title,
            user: req.user.id
        }

        const list = await List.create(reqList);
        res.status(201).json(list);
    } catch (err) {
        console.log(err);
    }
})


// PUT api/lists/:id  [Update a list]
router.put('/:id', async (req, res) => {
    try {
        const list = await List.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!list) {
            return res.status(404).json({msg: "List not found"});
        }

        res.status(200).json(list);
    } catch (err) {
        console.log(err);
    }
})

// DELETE api/lists/:id  [Delete a list]
router.delete('/:id', async (req, res) => {
    const list = await List.findById(req.params.id);

    if(!list) {
        return res.status(404).json({msg: "List not found"});
    }

    list.remove();

    res.status(200).json(list)
})


module.exports = router;