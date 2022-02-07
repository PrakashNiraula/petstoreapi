const mongoose= require ('mongoose');

const RowOfSales=new mongoose.Schema({
  productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'
},
buyer:{
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
}
})

const Sales= new mongoose.Schema
({
  userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
  },
  
  product:[RowOfSales]

},{ timestamps: true });

module.exports = mongoose.model('Sales',Sales)