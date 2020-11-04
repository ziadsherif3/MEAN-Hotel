const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');

module.exports.getAllReviews = function(req, res) {
    const hotelId = req.params.hotelId;

    console.log(`${req.method} request to ${hotelId} hotel reviews is made.`);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec((err, doc) => {
            res.status(200).json(doc.reviews);
        });
}

module.exports.getOneReview = function(req, res) {
    const hotelId = req.params.hotelId;
    const reviewId = req.params.reviewId;

    console.log(`${req.method} request to ${hotelId} hotel ${reviewId} review is made.`);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec((err, doc) => {
            res.status(200).json(doc.reviews.id(reviewId));
        });
}