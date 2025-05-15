const Joi = require('joi');

const registerSchema = Joi.object({
    first_name: Joi.string().min(1).max(50),
    last_name: Joi.string().min(1).max(50),
    phone: Joi.string()
      .pattern(/^\+?[0-9]{7,15}$/)
      .messages({
        "any.required": "Phone number is required" 
      }),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .messages({
        "string.email": "Please enter a valid email address.",
        "any.required": "Email is required.",
      }),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{10,}$"))
      .required()
      .messages({
        "string.pattern.base": "Password must be at least 10 characters long and contain only letters and numbers.",
        "string.empty": "Password is required.",
      }),
    address: Joi.string().allow('').optional(),
  });  

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2})
        .required()
        .messages({
        "string.only": "Please enter a valid email address.",
        "any.required": "Email is required",
    }),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{10,}$"))
        .required()
        .messages({
        "string.only": "Password must be at least 10 characters long and contain only letters and numbers.",
        "any.required": "Password is required",
    }),
});

const updateSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).optional(),
  last_name: Joi.string().min(2).max(50).optional(),
  phone: Joi.string().pattern(/^\+?\d{7,15}$/).optional(),
  email: Joi.string().email().optional(),
  address: Joi.string().allow('').optional(),
});

module.exports = {
    registerSchema,
    loginSchema,
    updateSchema,
};