const mongoose = require ('mongoose');
const categorySchema = new mongoose.Schema
({
    categoryName:{
        type:String,
        required: true  
    },
    imageName:{
        type: String,
        required: false
    }
},{ timestamps: true });

module.exports = mongoose.model('Category', categorySchema)