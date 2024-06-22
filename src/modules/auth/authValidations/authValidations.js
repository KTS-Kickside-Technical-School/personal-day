import Joi from "joi";

export const registrationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'))
        .messages({
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
            'string.min': 'Password must be at least {#limit} characters long',
            'string.max': 'Password must not exceed {#limit} characters'
        })
});


export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required()
})

export const verifyPasswordSchema = Joi.object({
    userId: Joi.string().required(),
    token: Joi.string().min(6).max(6).required(),
    password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'))
        .messages({
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
            'string.min': 'Password must be at least {#limit} characters long',
            'string.max': 'Password must not exceed {#limit} characters'
        })
})


export const verifyLogoutSchema = Joi.object({
    token: Joi.string().required()
})