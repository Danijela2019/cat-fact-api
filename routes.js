const express = require('express');
const router = express.Router();
const util = require('./utility');
const Fact = require('./models').Fact;


router.param('id', (req, _res, next, id) => {
    Fact.findById(id,(err, doc)=> {
        if(!doc) {
            err = new Error(`The requested quote id:${req.params.id} does not exist`);
            err.status = 404;
            return next(err)
        }
        if(err) {
            return next(err);
        }
        req.fact = doc;
        next();
    })
})

router.get('/',(_req, res, next)=> {
    Fact.find({}, (err, facts) => {
        if(err) return next(err)
        res.json(facts)
    })
});
router.get('/:id',(req, res)=> {
    res.json(req.fact)
}); 

router.get('/catfact/random', (_req,res)=>{
    Fact.find({}, (err, facts) => {
        if(err) return next(err)
        const randomFact= util.getRandomFact(facts);
        res.json(randomFact);
    })
});

router.post('/', (req, res, next) => {
    if (util.isEmptyObject(req.body) || !req.body.user || !req.body.text ){
        res.status(422).json({message: 'You need to add both, user and text to proceed'});
    } else {
        const fact = new Fact(req.body);
        fact.save((err, fact) => {
            if(err) return next(err)
            res.status(201).json(fact)
        })
    }
}); 

router.delete('/:id',(req, res,next) => {
   req.fact.remove((err) => {
        if(err) return next(err)
        res.status(204).end()
        })
}); 

router.put('/:id',(req, res, next)=> {
    req.fact.updateOne(req.body, (err, _resault) => {
        if(err) return next(err);
        res.status(204).end();
    })
});

module.exports = router;