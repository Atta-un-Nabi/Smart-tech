const mongoose = require('mongoose')
const { Schema } = mongoose;
const categorySchemma = new Schema({
    Name: {
        type: 'string',
        required: true
    },
    Discription: {
        type: 'string',
        required: true
    }
});
module.exports = mongoose.model("Categories" , categorySchemma); 