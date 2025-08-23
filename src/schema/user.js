import Joi from "joi";

export const registerUser = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const loginUser = Joi.object({
    email: Joi.string().email().required(), 
    password: Joi.string().min(6).required()
});