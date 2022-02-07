const validator = require('validator');
//const { default: validator } = require('validator');

const RegisterInput =(data)=>{
    let errors ={};

    if (data.username){
        if(!validator.isLength(data.username.trim(),{ min: 6,max : 30})) {
            errors.username='Username must be between 6 and 30 character';
        }

    }else errors.username="Username is required.";

    if (data.password){
        if(!validator.isLength(data.password.trim(),{min:6,max:30})) {
            errors.password='Password must be between 6 and 30 character';
        }

    }else errors.password="Password is required";
    return{
        errors,
        isValid: Object.keys(errors).length==0

    }
}
module.exports={
    RegisterInput
}