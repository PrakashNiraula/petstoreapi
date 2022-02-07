const mongoose= require ('mongoose');
//const Schema=mongoose.Schema;
//const cartSchema=require('./Product'); 

const RowOfOrder=new mongoose.Schema({
  productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'
},
seller:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User'
},
productName:{
  type:String,
    required:true
},
productPrice:{
  type:String,
  required:true
},
productImage:{

type:String,
required:true

},

quantity:{
  type:Number,
  required:true,
  default:1
},
total:{
  type:String,
  required:true
},
payment:{
  type:String,
  required:false
},deliverTo:{
  type:String,
  required:false
}
})

module.exports = mongoose.Schema(RowOfOrder);
