const fs = require('fs');
const data = require('./data/data');


const getAllFacts = () => {
    return new Promise(( resolve, reject ) => {
        fs.readFile('./data/data.json', 'utf8',(err,data) => {
            if(err) {
            reject(err);
            } else {
               const json = JSON.parse(data);
                resolve(json);
            }
        });

    });
};

const getSingleFact = (reqId) => {
    return new Promise((resolve, reject)=> {
        fs.readFile('./data/data.json', 'utf8',(err,data) => {
            if (err){
                reject(err)
            } else {
                const jsonObj = JSON.parse(data);
                const fact = jsonObj.find(element => element.id == reqId);
                resolve(fact);
            }
        })
    })
}

const nextId = (catFacts) => {
    const highestId = catFacts.reduce((a, c) => (c.id > a ? c.id : a), 0);
    return Number.parseInt(highestId, 10) + 1;
  };

  const createNewFact = (body) =>{
    return new Promise((resolve, reject)=> {
        fs.readFile('./data/data.json', 'utf8', async(err,data) => {
            if (err){
                reject(err)
            } else {
                const jsonObj = JSON.parse(data);
                const newCatFact = {
                    id: nextId(jsonObj),
                    user: body.user,
                    text: body.text
                }
                const array= await getAllFacts();
                array.push(newCatFact);
                const json = JSON.stringify(array, null, 2);
                fs.writeFile('./data/data.json', json, 'utf8', (err) => {
                  if (err) throw err;
                    });
                resolve(newCatFact)
            }
        })
    }) 
}

const deleteCatFact = (id) => {
    return new Promise((resolve, reject)=> {
        fs.readFile('./data/data.json', 'utf8', async(err,data) => {
            if (err){
                reject(err)
            } else {
                const parsedData = JSON.parse(data).filter((f) => f.id !== parseInt(id, 10))
               const json =  JSON.stringify(parsedData, null, 2);
               fs.writeFile('./data/data.json', json,'utf8', (err) => {
                  if (err) throw err;
                    });
                resolve(parsedData)
            }
        })
    }) 
}

const getRandomFact = () => {
    let index=Math.floor(Math.random()*data.length);
     return data[index];
}

const updateCatFact = (fact) => {
    return new Promise((resolve, reject)=> {
        fs.readFile('./data/data.json', 'utf8', async(err,data) => {
            if (err){
                reject(err)
            } else {
                const filteredArray = JSON.parse(data).filter((f) => f.id !== parseInt(fact.id, 10))
               
            filteredArray.push(fact)
            const json =  JSON.stringify(filteredArray, null, 2);
                fs.writeFile('./data/data.json', json,'utf8', (err) => {
                  if (err) throw err;
                    });
                resolve(filteredArray)
            }
        })
    }) 
}

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