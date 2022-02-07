const express=require('express');
const router=express.Router();
const Cart= require('../model/Cart');
const User=require('../model/User');
const auth=require('../Router/auth')


router.route('/')
.get((req,res,next)=>
{
    User.findById(req.user.userId).then(user=>{
        if(user.cart.length===0){
            Cart.create({userId:`${req.user.userId}`,product:[]}).then(cart=>{
user.cart.push(cart._id)
user.save().then(user=>{
    res.json(cart);
}).catch(err=>next(err))
            }).catch(err=>next(err));
        }else{
            Cart.findById(user.cart[0]).then(cart=>{
res.json(cart)
            })
        }
    }).catch(err=>next(err))
   
})

.post((req,res,next)=>{
    User.findById(req.user.userId).then(user=>{
        Cart.findById(user.cart[0]).then(cart=>{
            //productId,productName,productPrice,quantity,total
            //console.log(req.body);
            cart.product.push(req.body);
            cart.save().then(cart=>{
                res.json(cart)
            })
        })
    }).catch(err=>next(err))


  
})

.delete((req,res,next)=>{
 User.findById(req.user.userId).then(user=>{
     Cart.findById(user.cart[0]).then(cart=>{
         cart.product=[];
         cart.save().then(cart=>{
             res.json(cart);
         }).catch(err=>next(err))
     }).catch(err=>next(err))
 }).catch(err=>next(err))


})

router.route('/row/:row_id')
.get((req,res,next)=>{
    User.findById(req.user.userId).then(user=>{
        Cart.findById(user.cart[0]).then(cart=>{
            let productsinCart=cart.product;
            productsinCart.forEach(row => {
                if(row._id==req.params.row_id){
                    res.json(row);
                }  
            });
        }).catch(err=>next(err))
    }).catch(err=>next(err))      
})

.put((req,res,next)=>{
    User.findById(req.user.userId).then(user=>{
        Cart.findById(user.cart[0]).then(cart=>{
            cart.product.id(req.params.row_id).quantity=req.body.quantity;
            cart.product.id(req.params.row_id).total=req.body.total;
            cart.save().then(cart=>{
                res.json(cart);
            }).catch(err=>next(err));
        }).catch(err=>next(err));
    }).catch(err=>next(err))  ;

})

.delete((req,res,next)=>{
    User.findById(req.user.userId).then(user=>{
        Cart.findById(user.cart[0]).then(cart=>{
            let newProducts=[];
           cart.product.forEach(row => {
               if(row._id!=req.params.row_id){
                   newProducts.push(row);
               }
           }); 
           cart.product=newProducts;
           cart.save().then(cart=>{
               res.json(cart);
           }).catch(err=>next(err))
        }).catch(err=>next(err));
    }).catch(err=>next(err))  ;
  
})
module.exports=router;