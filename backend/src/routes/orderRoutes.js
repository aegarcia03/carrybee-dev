const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();
const validate = require('../midleware/validator');
const { createOrderSchema, updateOrderSchema } = require('../validators/orderValidator');


router.post('/', validate(createOrderSchema), orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.get('/', orderController.getAllOrders);
router.put('/:id', validate(updateOrderSchema), orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;