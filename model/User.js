const mongoose = require('mongoose');
//const validator=require('validator');
const userSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true
    },

    lname: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    locality: {
        type: String,
        required: true
    },myBalance:{
        type: String,
        default:"10000",
        required: false

    },

    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    }],
    myproduct: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }], 
    favourite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }], 
     order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }], sales: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mysales'
    }]
    ,
    role: {
        type: String,
        default: 'buyer',
        enum: ['admin', 'buyer', 'doctor']
    }
},{ timestamps: true });

module.exports = mongoose.model('User', userSchema)