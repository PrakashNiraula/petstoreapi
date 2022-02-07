const express=require('express');
const Category = require('../model/Category');
const router=express.Router();
const Product= require('../model/Product');
const User=require("../model/User");
const auth=require("./auth");


router.route('/')
.get((req,res,next)=>
{
    Product.find()  
    .then((products)=>{
        res.json(products);
    }).catch(next);
})

.post(auth.verifyUser,(req,res,next)=>{
   Product.create(req.body)
    .then(products =>{
        products.seller=req.user.userId;
        products.save().then(products=>{
            User.findById(req.user.userId).then(user=>{
                user.myproduct.push(products._id);
                user.save()
                .then(user=>{
                    res.status(201).json(products);
                }).catch(err=>next(err));
    
            }).catch(err=>newxt(err));

        }).catch(err=>next(err));
       
    }).catch(next);
})

.delete((req,res,next)=>{
   Product.deleteMany()
    .then(reply=>{
        res.json(reply);
    }).catch(next);
})

router.route('/:products_id')
.get((req,res,next)=>{
   Product.findById(req.params.products_id)
    .then(products=>{
        res.json(products);
    }).catch(next);
        
})

.put((req,res,next)=>{
  Product.findByIdAndUpdate(req.params.products_id, {$set:req.body}, {new:true})
.then(updatedProduct=>{
    res.json(updatedProduct)
}).catch(next);
})

.delete((req,res,next)=>{
   Product.deleteOne({_id:req.params.products_id})
    .then(reply=>{
        res.json(reply);
    }).catch(next);
})

// //foreign key one to many
router.route('/:products_id/category')
.get((req, res, next)=>{
    Product.findById(req.params.products_id)
    .then(products=>{
        res.json(products.category);
    }).catch(err => next(err));
})

.post((req ,res, next)=>{
  Product.findById(req.params.products_id)
    .then(products=>{
       Category.create(req.body)
        .then(categories=>{
           products.categories.push(categories._id);
           products.save()
            .then(updatedProduct=>{
                res.status(201).json(updatedProduct.categories);
            }).catch(next);
        }).catch(next);
    }).catch(next);
})
.delete((req,res,next)=>{
   Product.findById(req.params.products_id)
    .then(products=>{
       Category.deleteMany({_id:{$in:products.categories}})
        .then(reply=>{
            products.categories=[];
          products.save()
            .then(updatedProduct=>{
                res.json({reply,updatedProduct})
            }).catch(next);
        }).catch(next);
    }).catch(next);
})

router.route('/:products_id/category/:category_id')
.get((req,res,next)=>{
    Product.findById(req.params.product_id)
    .then(products=>{
        if(products.category.includes(req.params.category_id))
        {
            Category.findById(req.params.category_id)
            .then(categories=>{
                res.json(categories);
            }).catch(next);
        }
        else{
            let err =new Error('category not found');
            err.status(404);
            next(err);
        }
    }).catch(next);
})
.put((req,res,next)=>{
    Product.findById(req.params.product_id)
    .then(products=>{
        if (products.category.includes(req.params.category_id))
        {
           Category.findByIdAndUpdate(req.params.category_id,{$set:req.body},{new:true})
            .then(Category=>{
                res.json(Category);
            }).catch(next);
        }
        else{
            throw new Error('Not found!');
        }
    }).catch(next);
})

.delete((req,res,next)=>{
    Product.findById(req.params.product_id)
    .then(products=>{
        if (products.category.includes(req.params.category_id))
        {
            Category.deleteOne({_id:req.params.category_id})
            .then(reply=>{
                products.category=products.category.filter((value)=>{
                    return value != req.params.category_id;
                })
                products.save()
                .then(updatedProduct=>{
                    res.json({reply,updatedProduct});
                }).catch(next);
            }).catch(next);
        }
        else{
            throw new Error ('Not found!');
        }
    })
})

module.exports=router;