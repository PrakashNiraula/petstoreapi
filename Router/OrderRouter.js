const express=require('express');
const router=express.Router();
const Order= require('../model/Order');
const User=require('../model/User');
const auth=require('../Router/auth');
const Cart=require('../model/Cart');
const Sales=require('../model/Sales');
//const OrderRow=require('../model/OrderRow');


router.route('/')
.get((req,res,next)=>
{
    User.findById(req.user.userId).then(user=>{
        if(user.order.length===0){
            Order.create({userId:`${req.user.userId}`,product:[]}).then(order=>{
user.order.push(order._id)
user.save().then(order=>{
    res.json(order);
}).catch(err=>next(err))
            }).catch(err=>next(err));
        }else{
            Order.findById(user.order[0]).then(order=>{
res.json(order)
            })
        }
    }).catch(err=>next(err))
   
})

.post(auth.verifyUser,(req,res,next)=>{
    User.findById(req.user.userId).then(user=>{
        Cart.findById(user.cart[0]).then(cart=>{
            let productsincart=cart.product;
            let newOrderProducts=[];
            for (i = 0; i < productsincart.length; i ++) {
                let newOrderROw={};
              newOrderROw.productId=productsincart[i].productId;
              newOrderROw.seller=productsincart[i].seller;
              newOrderROw.productName=productsincart[i].productName;
              newOrderROw.productPrice=productsincart[i].productPrice;
              newOrderROw.productImage=productsincart[i].productImage;
              newOrderROw.quantity=productsincart[i].quantity;
              newOrderROw.total=productsincart[i].total;
              newOrderROw.payment=req.body.payment;
              newOrderROw.deliverTo=req.body.deliverTo;
              newOrderProducts.push(newOrderROw);
            
            }
            Order.findById(user.order[0]).then(order=>{
                order.product=order.product.concat(newOrderProducts);
                order.save().then(order=>{

                    let productsincart=cart.product;
                    let newOrderProducts=[];

                    for (i = 0; i < productsincart.length; i ++) {
                        let newOrderROw={};
                      newOrderROw.productId=productsincart[i].productId;
                      newOrderROw.buyer=req.user.userId;
                      newOrderROw.seller=productsincart[i].seller;
                      newOrderROw.productName=productsincart[i].productName;
                      newOrderROw.productPrice=productsincart[i].productPrice;
                      newOrderROw.productImage=productsincart[i].productImage;
                      newOrderROw.quantity=productsincart[i].quantity;
                      newOrderROw.total=productsincart[i].total;
                      newOrderROw.payment=req.body.payment;
                      newOrderROw.deliverTo=req.body.deliverTo;
                      newOrderProducts.push(newOrderROw);
                     // console.log(newOrderProducts);
                    }

                    cart.product=[];
                    cart.save();
                    res.json(order);
                    newOrderProducts.forEach(element => {

                    Sales.find({userId:`${element.seller}`}).then(sales=>{
                        //console.log(sales);
                        Sales.findById(sales[0]._id).then(sales=>{
                            sales.product.push(element)
                            sales.save();
                            

                        }).catch(err=>next(err));
                       
                    }).catch(err=>next(err))
                   
                    .catch(err=>next(err));
                        
                    });

                }).catch(err=>next(err))
            }).catch(err=>next(err))
        }).catch(err=>next(err))

    }).catch(err=>next(err))

})

.delete((req,res,next)=>{
 User.findById(req.user.userId).then(user=>{
     Order.findById(user.order[0]).then(order=>{
         order.product=[];
         order.save().then(order=>{
             res.json(order);
         }).catch(err=>next(err))
     }).catch(err=>next(err))
 }).catch(err=>next(err))


})

router.route('/row/:row_id')
.get((req,res,next)=>{
    User.findById(req.user.userId).then(user=>{
        Order.findById(user.order[0]).then(order=>{
            let productsinOrder=order.product;
            productsinOrder.forEach(row => {
                if(row._id==req.params.row_id){
                    res.json(row);
                }  
            });
        }).catch(err=>next(err))
    }).catch(err=>next(err))      
})

.put((req,res,next)=>{
    User.findById(req.user.userId).then(user=>{
        Order.findById(user.order[0]).then(order=>{
            order.product.id(req.params.row_id).quantity=req.body.quantity;
            order.product.id(req.params.row_id).total=req.body.total;
            order.save().then(order=>{
                res.json(order);
            }).catch(err=>next(err));
        }).catch(err=>next(err));
    }).catch(err=>next(err))  ;

})

.delete((req,res,next)=>{
    User.findById(req.user.userId).then(user=>{
        Order.findById(user.order[0]).then(order=>{
            let newProducts=[];
           order.product.forEach(row => {
               if(row._id!=req.params.row_id){
                   newProducts.push(row);
               }
           }); 
           order.product=newProducts;
           order.save().then(order=>{
               res.json(order);
           }).catch(err=>next(err))
        }).catch(err=>next(err));
    }).catch(err=>next(err))  ;
  
})


module.exports=router;