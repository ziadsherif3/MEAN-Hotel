const express = require('express');
const router = express.Router();
const hotelsCtrl = require('../controllers/hotels.controllers');
const reviewsCtrl = require('../controllers/reviews.controllers');
const usersCtrl = require('../controllers/users.controllers');

/** Hotels routes */

router
    .route('/hotels')
    .get(hotelsCtrl.hotelsGetAll)
    .post(hotelsCtrl.postHotel);

router
    .route('/hotels/:hotelId')
    .get(hotelsCtrl.getHotel)
    .put(hotelsCtrl.updateHotel)
    .delete(hotelsCtrl.deleteHotel);

/** Reviews routes */

router
    .route('/hotels/:hotelId/reviews')
    .get(reviewsCtrl.getAllReviews)
    .post(usersCtrl.authenticate, reviewsCtrl.postReview);

router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(reviewsCtrl.getOneReview)
    .put(reviewsCtrl.updateReview)
    .delete(reviewsCtrl.deleteReview);

/** Users routes */

router
    .route('/users/login')
    .post(usersCtrl.login);

router
    .route('/users/register')
    .post(usersCtrl.register);

module.exports = router;