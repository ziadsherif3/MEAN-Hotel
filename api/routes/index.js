const express = require('express');
const router = express.Router();
const hotelsctrl = require('../controllers/hotels.controllers');

router
    .route('/hotels')
    .get(hotelsctrl.hotelsGetAll);

router
    .route('/hotels/:hotelID')
    .get(hotelsctrl.getHotel);

module.exports = router;