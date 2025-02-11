const express = require('express');
const parcelController = require('../controllers/parcelController');
const router = express.Router();

router.post('/parcels', parcelController.createParcel);
router.get('/parcels/:id', parcelController.getParcelById);
router.get('/parcels', parcelController.getAllParcels);
router.put('/parcels/:id', parcelController.updateParcel);
router.delete('/parcels/:id', parcelController.deleteParcel);

module.exports = router; 
