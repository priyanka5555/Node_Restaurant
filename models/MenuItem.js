const mongoose = require('mongoose')

//Define Menu schema
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
            type: String,
            enum: ['sweet', 'spicy', 'sour'],    //enum means types - kon kon se type ka taste hoga
            required: true,    
    },
    isddrink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: String,
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
});

//With the help of this schema now we will create modules

//create Menu Model
const menuItem = mongoose.model('MenuItem',menuItemSchema);
module.exports = menuItem