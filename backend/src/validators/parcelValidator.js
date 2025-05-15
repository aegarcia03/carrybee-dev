const Joi = require('joi');

const createParcelSchema = Joi.object({
  item_name: Joi.string().required(),
  category: Joi.string().required(),
  quantity: Joi.number().integer().positive().required(),
  weight: Joi.number().positive().required(),
  width: Joi.number().positive().optional(),
  height: Joi.number().positive().optional(),
  length: Joi.number().positive().optional(),
  description: Joi.string().allow('', null),
  user_id: Joi.string().uuid().required(),
});

const updateParcelSchema = Joi.object({
    item_name: Joi.string().optional(),
    category: Joi.string().optional(),
    quantity: Joi.number().integer().positive().optional(),
    weight: Joi.number().positive().optional(),
    width: Joi.number().positive().optional(),
    height: Joi.number().positive().optional(),
    length: Joi.number().positive().optional(),
    description: Joi.string().allow('', null).optional(),
  });
  

module.exports = {
  createParcelSchema,
  updateParcelSchema,
};
