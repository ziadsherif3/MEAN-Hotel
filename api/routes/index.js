const express = require('express');
const router = express.Router();
const hotelsctrl = require('../controllers/hotels.controllers');

router
    .route('/hotels')
    .get(hotelsctrl.hotelsGetAll);

router
    .route('/hotels/:hotelId')
    .get(hotelsctrl.getHotel);

router
    .route('/hotels/add')
    .post(hotelsctrl.postHotel);

module.exports = router;