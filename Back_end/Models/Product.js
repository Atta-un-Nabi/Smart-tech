const mongoose = require('mongoose')
const { Schema } = mongoose;
const productSchemma = new Schema({
    Name: {
        type: 'string',
        required: true
    },
    Discription: {
        type: 'string',
        required: false
    },
    Category: {
        type: 'string',
        required: true
    },
    image: {
        type: 'string',
        required: true
    },
    price: {
        type: 'string',
        required: true
    },
    Date: {
        type: 'Date',
        default: Date.Now
    }
});
module.exports = mongoose.model("Products" , productSchemma ,"products");