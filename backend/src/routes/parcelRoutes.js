const express = require('express');
const parcelController = require('../controllers/parcelController');
const router = express.Router();
const validate = require('../middleware/validator');
const { parcelSchema, updateParcelSchema } = require('../validators/parcelValidator');

router.post('/', validate(parcelSchema), parcelController.createParcel);
router.get('/:id', parcelController.getParcelById);
router.get('/', parcelController.getAllParcels);
router.put('/:id', validate(updateParcelSchema), parcelController.updateParcel);
router.delete('//:id', parcelController.deleteParcel);

module.exports = router; 
