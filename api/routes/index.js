const express = require('express');
const router = express.Router();
const hotelsCtrl = require('../controllers/hotels.controllers');
const reviewsCtrl = require('../controllers/reviews.controllers');

/** Hotels routes */

router
    .route('/hotels')
    .get(hotelsCtrl.hotelsGetAll)
    .post(hotelsCtrl.postHotel);

router
    .route('/hotels/:hotelId')
    .get(hotelsCtrl.getHotel);

/** Reviews routes */

router
    .route('/hotels/:hotelId/reviews')
    .get(reviewsCtrl.getAllReviews)
    .post(reviewsCtrl.postReview);

router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(reviewsCtrl.getOneReview);

module.exports = router;