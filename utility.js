const { text } = require('express');
const fs = require('fs');

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
                const parsedNewCatFact = JSON.stringify(newCatFact);
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

module.exports = {
    getAllFacts, 
    getSingleFact,
    createNewFact,
    deleteCatFact
};