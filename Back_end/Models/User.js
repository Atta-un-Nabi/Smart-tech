const mongoose = require('mongoose')
const { Schema } = mongoose;
const UserSchema = new Schema({
    firstName: {
        type: 'string',
        required: true
    },
    lastName: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    gender: {
        type: 'string',
        required: false
    },
    password: {
        type: 'string',
        required: true
    },
    Date: {
        type: 'Date',
        default: Date.now()
    }

});
module.exports = mongoose.model("usr_data" , UserSchema ,"usr_data" );