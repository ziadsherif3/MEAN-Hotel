const express = require('express');
const router = express.Router();
const hotelsCtrl = require('../controllers/hotels.controllers');
const reviewsCtrl = require('../controllers/reviews.controllers');

router
    .route('/hotels')
    .get(hotelsCtrl.hotelsGetAll);

router
    .route('/hotels/:hotelId')
    .get(hotelsCtrl.getHotel);

router
    .route('/hotels/add')
    .post(hotelsCtrl.postHotel);

/** Reviews routes */

router
    .route('/hotels/:hotelId/reviews')
    .get(reviewsCtrl.getAllReviews);

router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(reviewsCtrl.getOneReview);

module.exports = router;