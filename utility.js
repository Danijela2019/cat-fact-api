const fs = require('fs');

const getAllFacts = () => {
    return new Promise(( resolve, reject ) => {
        fs.readFile('./data/data.json', 'utf8',(err,data) => {
            if(err) {
            reject(err);
            } else {
               const catFactsArray= JSON.parse(data);
                resolve(catFactsArray);
            }
        });
    });
};

const writeToFile = (json) => {
    fs.writeFile('./data/data.json', json,'utf8', (err) => {
        if (err) throw err;
    })
}

const getSingleFact = async (reqId) => {
    const catFactsArray = await getAllFacts();
    const fact = catFactsArray.find(element => element.id == reqId);
    return(fact);
}

const createNewFact = async (body) => {
    const catFactsArray = await getAllFacts();
    const newCatFact = {
        id: nextId(catFactsArray),
        user: body.user,
        text: body.text
    }
    catFactsArray = [...catFactsArray, newCatFact];
    const json = JSON.stringify(catFactsArray, null, 2);
    writeToFile(json);
    return(newCatFact)
}
       
const deleteCatFact = async (id) => {
    const catFactsArray = await getAllFacts();
    const filteredCatFactsArray = catFactsArray.filter((f) => f.id !== parseInt(id, 10));
    const json =  JSON.stringify(filteredCatFactsArray, null, 2);
    writeToFile(json);
    return(filteredCatFactsArray)
}

const updateCatFact = async (fact) => {
    const catFactsArray = await getAllFacts();
    const filteredCatFactsArray = catFactsArray.filter((f) => f.id !== parseInt(fact.id, 10));
    filteredCatFactsArray = [...filteredCatFactsArray, fact];
    const json =  JSON.stringify(filteredCatFactsArray, null, 2);
    writeToFile(json); 
    return(filteredCatFactsArray)
}
    
const getRandomFact = async() => {
    const catFactsArray = await getAllFacts();
    let index=Math.floor(Math.random()*catFactsArray.length);
     return catFactsArray[index];
}

const nextId = (catFacts) => {
    const highestId = catFacts.reduce((a, c) => (c.id > a ? c.id : a), 0);
    return Number.parseInt(highestId, 10) + 1;
  };

const asyncHandler = (cb) => async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };

const isEmptyObject = (obj) => !Object.keys(obj).length;

module.exports = {
    getAllFacts, 
    getSingleFact,
    createNewFact,
    deleteCatFact,
    updateCatFact,
    asyncHandler,
    isEmptyObject,
    getRandomFact
};