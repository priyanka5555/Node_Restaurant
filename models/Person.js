const mongoose = require('mongoose')

//Define person schema
const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
            type: String,
            enum: ['chef', 'waiter', 'manager'],
            required: true,    
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    }
});

//With the help of this schema now we will create modules

//create Person Model
const Person = mongoose.model('Person',PersonSchema);
module.exports = Person

