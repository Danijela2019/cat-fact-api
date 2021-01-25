 const getRandomFact = (data) => {
    let index=Math.floor(Math.random()*data.length);
     return data[index];
}

const isEmptyObject = (obj) => !Object.keys(obj).length;

module.exports = {
    isEmptyObject,
    getRandomFact
};