// VALIDATION
const Joi = require('joi');

// Register Validation
const registerValidation = (data)=>{
    
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        userId: Joi.string().required(),
    };

    return Joi.validate(data,schema)
}

const loginValidation = (data)=>{
    
    const schema = {
        // name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        // userId: Joi.string().required(),
    };

    // return Joi.validate(data,schema)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
