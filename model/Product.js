const mongoose = require('mongoose');
//const mongoose=require('./Category');

const productSchema = new mongoose.Schema({
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    price: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true 
    },

    description: {
        type: String,
        required: true
    },

    availablepcs: {
        type: String,
        required: true
    },

    orderlimit: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },
   
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

},{ timestamps: true });

module.exports = mongoose.model('Product', productSchema)