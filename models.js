const mongoose = require('mongoose');


const Shema = mongoose.Schema;

const FactSchema = new Shema({
    user:String,
    text: String,
    createdAt: {type:Date, default: Date.now}
});

const Fact = mongoose.model('Fact', FactSchema);

module.exports.Fact =  Fact;
