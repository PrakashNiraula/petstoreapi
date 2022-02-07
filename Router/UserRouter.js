const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const Product=require('../model/Product');
const jwt = require('jsonwebtoken');
const auth=require("./auth");

const validators = require('../utils/validators');

const router = express.Router();

router.post('/register', (req, res, next) => {


    let { password, fname, lname, email, phone, city, state, locality, role } = req.body;
    User.findOne({ email })
        .then((user) => {
            if (user) {
                let err = new Error('User already exists!');
                err.status = 401;
                return next(err);
            }
            bcrypt.hash(password, 10, (err, hashed) => {
                if (err) next(err);
                User.create({ password: hashed, fname, lname, email, phone, city, state, locality, role })
                    .then((user) => {
                        res.json({ status: 'Registration Sucessful' });
                    }).catch(next);
            })

        }).catch(next);

});
router.post('/login', (req, res, next) => {

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user === null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            }
            bcrypt.compare(req.body.password, user.password, function (err, status) {
                if (!status) {
                    let err = new Error('Password does not match!');
                    err.status = 401;
                    return next(err);
                }
                let token = jwt.sign({ userId: user._id, role: user.role }, 'SecretKey');
                res.json({ status: 'Login Successful!', token: token,role:`${user.role}` ,email:`${user.email}`
                ,myproducts:`${user.myproduct}`,
            cart:`${user.cart}`,order:`${user.order}`,myBalance:`${user.myBalance}`,address:`${user.locality+"%"+user.state+"%"+user.city}`,favourite:`${user.favourite}`,sales:`${user.sales}`});
            });
        }).catch(next);

});

router.route("/product")
.get(auth.verifyUser,(req,res,next)=>{
    User.findById(req.user.userId).then((user)=>{
      
        res.json({ status: 'Get my products', role:`${user.role}` ,email:`${user.email}`
        ,myproducts:`${user.myproduct}`,
    cart:`${user.cart}`,order:`${user.order}`,myBalance:`${user.myBalance}`,address:`${user.locality+"%"+user.state+"%"+user.city}`,favourite:`${user.favourite}`,sales:`${user.sales}`});


    })
    
})

.post(auth.verifyUser,(req,res,next)=>{

    User.findById(req.user.userId).then(user=>{  
        user.myproduct.push(req.body._id);
        user.save().then(user=>{
            res.json(user);
        })

    })

})

.delete(auth.verifyUser,(req,res,next)=>{

    User.findById(req.user.userId).then(user=>{

        user.myproduct=[];
        user.save().then(user=>{
            res.json(user);
        })

    })
})



router.route("/favourite")
.get(auth.verifyUser,(req,res,next)=>{
    User.findById(req.user.userId).then((user)=>{
       res.json(user.favourite)

    })
    
})

.post(auth.verifyUser,(req,res,next)=>{

    User.findById(req.user.userId).then(user=>{  
        user.favourite.push(req.body._id);
        user.save().then(user=>{
            res.json({ status: 'Update Successful!',role:`${user.role}` ,email:`${user.email}`
            ,myproducts:`${user.myproduct}`,
        cart:`${user.cart}`,order:`${user.order}`,myBalance:`${user.myBalance}`,address:`${user.locality+"%"+user.state+"%"+user.city}`,favourite:`${user.favourite}`,sales:`${user.sales}`});
     
        })

    })

})

.delete(auth.verifyUser,(req,res,next)=>{

    User.findById(req.user.userId).then(user=>{

        user.favourite=[];
        user.save().then(user=>{
            res.json(user);
        })

    })
})




router.route("/favourite/:product_id")

  
    .delete(auth.verifyUser,(req,res,next)=>{

        User.findById(req.user.userId).then(user=>{
    let favs=[];
    let oldfavs=user.favourite;
    for(i=0;i<oldfavs.length;i++){
        if(oldfavs[i]!=req.params.product_id){
            favs.push(oldfavs[i]);
        }
    }
    
    user.favourite=favs;
    user.save().then(user=>{
        res.json({ status: 'Update Successful!',role:`${user.role}` ,email:`${user.email}`
        ,myproducts:`${user.myproduct}`,
    cart:`${user.cart}`,order:`${user.order}`,myBalance:`${user.myBalance}`,address:`${user.locality+"%"+user.state+"%"+user.city}`,favourite:`${user.favourite}`,sales:`${user.sales}`});
 
    }).catch(err=>next(err));
   
           
    
        })

    })








module.exports=router;