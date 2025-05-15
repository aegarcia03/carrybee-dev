const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware'); //add by phon
const router = express.Router();
const validate = require('../middleware/validator');
const { registerSchema, loginSchema, updateSchema } = require('../validators/userValidator');

router.get('/:email', userController.getUserByEmail);
router.post('/', validate(registerSchema), userController.registerUser); // Register user
router.post('/login', validate(loginSchema), userController.loginUser);
router.get('/', authenticate, userController.getAllUsers); // Protect this route
router.put('/:id', authenticate, validate(updateSchema), userController.updateUser); // Protect this route
router.delete('/:id', authenticate, userController.deleteUser); // Protect this route

module.exports = router;

//read this: how to add authentication to make route protected
//router.get('/users', userController.getAllUsers); unprotected route
//router.get('/users', authenticate, userController.getAllUsers); protected route
//just add authenticate as above