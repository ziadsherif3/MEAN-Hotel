const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');

module.exports.getAllReviews = function(req, res) {
    const hotelId = req.params.hotelId;

    console.log(`${req.method} request to ${hotelId} hotel reviews is made.`);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec((err, doc) => {
            const response = {
                status: 200,
                data: doc
            };

            if (err) {
                response.status = 500;
                response.data = err;
            }
            else if (!doc) {
                response.status = 404;
                response.data = { "Message": "No hotel found with this id." };
            }
            res.status(response.status).json(response.data);
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
            const response = {
                status: 200,
            };

            if (err) {
                response.status = 500;
                response.data = err;
            }
            else if (!doc) {
                response.status = 404;
                response.data = { "Message": "No hotel found with this id." };
            }
            else {
                response.data = doc.reviews.id(reviewId);
                if (!doc.reviews.id(reviewId)) {
                    response.status = 404;
                    response.data = { "Message": "No review found with this id." };
                }
            }
            res.status(response.status).json(response.data);
        });
}