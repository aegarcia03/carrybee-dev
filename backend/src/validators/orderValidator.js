const Joi = require('joi');

const createOrderSchema = Joi.object({
    user_id: Joi.string().uuid().required(),
    receiver_name: Joi.string().min(3).required(),
    pickup_address: Joi.string().min(3).required(),
    dropoff_address: Joi.string().min(3).required(),
    pickup_date: Joi.date().iso().required(), // ISO 8601 date format
    distance: Joi.number().positive().required(),
    vehicleType: Joi.string().valid('MOTORBIKE', 'CAR', 'VAN', 'TRUCK').required(),
    total: Joi.number().positive().required(),
    parcel_id: Joi.string().uuid().required(),
});

const updateOrderSchema = Joi.object({
    receiver_name: Joi.string().min(3),
    pickup_address: Joi.string().min(5),
    dropoff_address: Joi.string().min(5),
    pickup_date: Joi.date().iso(),
}).min(1);

module.exports = {
    createOrderSchema,
    updateOrderSchema,
};