const express = require('express');
const router = express.Router();
const util = require('./utility');

router.get('/', util.asyncHandler( async (_req, res)=> {
    const facts = await util.getAllFacts();
    res.status.json(facts)
}));

router.get('/:id', util.asyncHandler( async (req, res)=> {
    const fact = await util.getSingleFact(req.params.id);
    if(!fact) res.status(404).json({message:`The requested quote id:${req.params.id} does not exist`})
    res.json(fact)
}));

router.get('/catfact/random', util.asyncHandler(async (_req,res)=>{
    const fact = await util.getRandomFact();
    res.json(fact);
}))

router.post('/', util.asyncHandler(async (req, res) => {
    if (util.isEmptyObject(req.body) || !req.body.user || !req.body.text ){
         res.status(422).json({message: 'You need to add both, user and text to proceed'}); 
    } else {
        const newFact = await util.createNewFact(req.body)
        res.status(201).json(newFact)
    }
}));

router.delete('/:id', util.asyncHandler(async (req, res)=> {
    const fact = await util.getSingleFact(req.params.id)
    if(!fact){
        res.status(404).json({message:`The requested quote id:${req.params.id} does not exist`})
   } else {
        await util.deleteCatFact(req.params.id);
        res.status(204).end();
    }
}));

router.put('/:id', util.asyncHandler(async (req, res)=> {
    const fact = await util.getSingleFact(req.params.id)
    if(!fact) {
        res.status(404).json({message:`The requested quote id:${req.params.id} does not exist`})
    }
    if(util.isEmptyObject(req.body) || !req.body.user || !req.body.text ){
        res.status(422).json({message: 'You need to add both, user and text to proceed'}); 
    } else {
        fact.user = req.body.user;
        fact.text = req.body.text;
        await util.updateCatFact(fact);
        res.status(204).end();
    }
}));

module.exports = router;