const jwt=require('jsonwebtoken');

function verifyUser(req,res,next){
   let authHeader=req.headers.authorization;
   if(!authHeader){
       let Err=new Error("No authentication header");
       Err.status=401;
       return next(Err);
   }
   let token=authHeader.split(' ')[1];
   jwt.verify(token,'SecretKey',(err,payload)=>{
       if(err){
           let Err=new Error("Token validation problem");
           return next(err);
       }
       req.user=payload;
      // console.log(req.user);
       next();
   })
   
  
}

function verifyOwner(req,res,next){
    console.log(req.user)
    if(!req.user){
        let err=new Error("No authentication information");
        return next(err);
    }else if(req.user.role==='basic'){
        let Err=new Error("Forbidden");
        return next(Err);
    }
    next();
}


function verifyAdmin(req,res,next){
    //console.log(req.user)
    if(!req.user){
        return next(new Error("No req.user"));
    }else if(req.user.role!='admin'){
        let err=new Error("Unauthorized");
        return next(err);

    }
   
    next();
    // console.log(req.user)
}

module.exports={
    verifyUser,verifyOwner,verifyAdmin
};