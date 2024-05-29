const mongoose = require('mongoose');

const amazonDealSchema = new mongoose.Schema({
    title:{
        type: String
    },
    discount:{
        type: String
    }
});

module.exports = mongoose.model('amazonDealModel',amazonDealSchema);