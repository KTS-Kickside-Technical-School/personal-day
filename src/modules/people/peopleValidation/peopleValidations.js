import Joi from "joi";

export const peopleValidation = Joi.object({
    fullNames: Joi.string().required(),
    email: Joi.string(),
    phone: Joi.string()
})