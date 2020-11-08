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
};

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
};

function addReview(req, res, hotel) {
    hotel.reviews.push({
        name: req.body.name,
        rating: parseInt(req.body.rating),
        review: req.body.review
    });

    hotel.save((err, hotelUpdated) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.status(201).json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
        }
    });
}

module.exports.postReview = function(req, res) {
    const hotelId = req.params.hotelId;

    console.log(`${req.method} request to add a review to ${hotelId} hotel is made.`);
    
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
            if (doc) {
                addReview(req, res, doc);
            }
            else {
                res.status(response.status).json(response.data);
            }
        });
};