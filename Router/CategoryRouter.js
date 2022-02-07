const express=require('express');
const router=express.Router();
const Category= require('../model/Category');


router.route('/')
.get((req,res,next)=>
{
   Category.find()  
    .then((categories)=>{
        res.json(categories);
    }).catch(next);
})

.post((req,res,next)=>{
  Category.create(req.body)
    .then(categories =>{
        res.status(201).json(categories)
    }).catch(next);
})

.delete((req,res,next)=>{
  Category.deleteMany()
    .then(reply=>{
        res.json(reply);
    }).catch(next);
})

router.route('/:categories_id')
.get((req,res,next)=>{
  Category.findById(req.params.categories_id)
    .then(categories=>{
        res.json(categories);
    }).catch(next);
        
})

.put((req,res,next)=>{
 Category.findByIdAndUpdate(req.params.categories_id, {$set:req.body}, {new:true})
.then(updatedCategory=>{
    res.json(updatedCategory)
}).catch(next);
})

.delete((req,res,next)=>{
   Category.deleteOne({_id:req.params.categories_id})
    .then(reply=>{
        res.json(reply);
    }).catch(next);
})
module.exports=router;