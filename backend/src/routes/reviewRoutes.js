const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

router.post('/', reviewController.createReview);
router.get('/:user', reviewController.getReviewByUser);
router.get('/', reviewController.getAllReviews);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router; 
