const parcelService = require('../services/parcelService');

const createParcel =async (req, res) => {
  try {
    const newParcel = await parcelService.createParcel(req.body);
    res.status(201).json(newParcel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllParcels = async (req, res) => {
    try {
      const parcels = await parcelService.getAllParcels();
      res.status(200).json(parcels);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
const getParcelById = async (req, res) => {
    try {
      const parcel = await parcelService.getParcelById(req.params.id);
      res.status(200).json(parcel);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
};

const updateParcel = async (req, res) => {
    try {
      const updatedParcel = await parcelService.updateParcel(req.params.id, req.body);
      res.status(200).json(updatedParcel);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteParcel = async (req, res) => {
    try {
      const deleteMessage = await parcelService.deleteParcel(req.params.id);
      res.status(200).json(deleteMessage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};
  
module.exports = {
    createParcel,
    getAllParcels,
    getParcelById,
    updateParcel,
    deleteParcel,
};