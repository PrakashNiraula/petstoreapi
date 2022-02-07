const express=require('express');
const router=express.Router();
const Mysales= require('../model/Sales');
const User=require('../model/User');
const auth=require('../Router/auth')



router.route('/')
.get(auth.verifyUser,(req,res,next)=>
{
    User.findById(req.user.userId).then(user=>{
        if(user.sales.length==0){
            Mysales.create({userId:`${req.user.userId}`,product:[]}).then(mysales=>{
                user.sales.push(mysales._id)
                        user.save().then(user=>{
                res.json(mysales);
                }).catch(err=>next(err))
            }).catch(err=>next(err));
                 }else{
            Mysales.findById(user.sales[0]).then(mysales=>{
                res.json(mysales);
            })
        }
    }).catch(err=>next(err))
   
})

// .post((req,res,next)=>{
//     User.findById(req.user.userId).then(user=>{
//         Cart.findById(user.cart[0]).then(cart=>{
//             //productId,productName,productPrice,quantity,total
//             //console.log(req.body);
//             cart.product.push(req.body);
//             cart.save().then(cart=>{
//                 res.json(cart)
//             })
//         })
//     }).catch(err=>next(err))
// })

// .delete((req,res,next)=>{
//  User.findById(req.user.userId).then(user=>{
//      Cart.findById(user.cart[0]).then(cart=>{
//          cart.product=[];
//          cart.save().then(cart=>{
//              res.json(cart);
//          }).catch(err=>next(err))
//      }).catch(err=>next(err))
//  }).catch(err=>next(err))


// })


module.exports=router;