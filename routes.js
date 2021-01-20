const express = require('express');
const router = express.Router();
const util = require('./utility');

router.get('/',async (_req, res)=> {
    const facts = await util.getAllFacts();
    res.status(200).json(facts)
});

router.get('/:id', async (req, res)=> {
    const fact = await util.getSingleFact(req.params.id);
    console.log('This is fact',fact)
    res.status(200).json(fact)
});

router.post('/', async (req, res) => {
    const newFact = await util.createNewFact(req.body)
    res.status(201).json(newFact)
});

router.delete('/:id', async (req, res)=> {
    const updatedCatFacts = await util.deleteCatFact(req.params.id);
    res.json(updatedCatFacts)
});






//PUT a single fact /api/v1/catfacts/:id
//POST a sinlge fact /api/v1/
//GET a random fact 
module.exports = router;