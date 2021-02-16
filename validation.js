const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const verify = Joi.object({
        name: Joi.string().min(2).required(),
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })
    return verify.validate(data);
}


const loginValidation = (data) => {
    const verify = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })
    return verify.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;