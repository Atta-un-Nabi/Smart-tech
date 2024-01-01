const mongoose = require('mongoose')
const { Schema } = mongoose;
const resetTokenSchemma = new Schema({
    token: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true

    },
    Date: {
        type: 'Date',
        default: Date.Now
    }
});
module.exports = mongoose.model("R3537Token", resetTokenSchemma); 