// const dbConn = require('../data/dbconnection');
// const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');

function runGeoQuery(req, res) {
    const long = parseFloat(req.query.long);
    const lat = parseFloat(req.query.lat);

    /** Create the geoJSON point. */

    const point = { type: "Point", coordinates: [long, lat] };

    Hotel
        .aggregate([
            {
                $geoNear: {
                    near: point,
                    distanceField: "dist.calculated",
                    maxDistance: 2000,
                    includeLocs: "dist.Location",
                    spherical: true
                }
            }
        ], (err, docs) => {
            const response = {
                status: 200,
                data: docs
            };

            if (err) {
                response.status = 500;
                response.data = err;
            }
            else if (!docs) {
                response.status = 404;
                response.data = { "Message": "No hotels found." };
            }
            res.status(response.status).json(response.data);
        });
}

module.exports.hotelsGetAll = function(req, res) {
    // const db = dbConn.get();
    // const collection = db.collection('hotels');

    let offset = 0;
    let count = 5;
    let maxCount = 10;

    if (req.query && req.query.long && req.query.lat) {
        runGeoQuery(req, res);
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        res.status(400).send("Bad request.");
        return;
    }

    if (count > maxCount) {
        res.status(400).send("Bad request: Max count reached.");
        return;
    }

    console.log(`${req.method} request to hotels is made.`);

    // const docs = await collection
    //                         .find()
    //                         .skip(offset)
    //                         .limit(count)
    //                         .toArray();
    
    // res.status(200).json(docs);

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec((err, hotels) => {
            const response = {
                status: 200,
                data: hotels
            };

            if (err) {
                response.status = 500;
                response.data = err;
            }
            else {
                console.log(`Number of hotels: ${hotels.length}`);
            }
            res.status(response.status).json(response.data);
    });
};

module.exports.getHotel = function(req, res) {
    // const db = dbConn.get();
    // const collection = db.collection('hotels');

    const hotelId = req.params.hotelId;

    console.log(`${req.method} request to ${hotelId} hotel is made.`);

    // const doc = await collection
    //                             .findOne({"_id": ObjectId(hotelId)});
    // res.status(200).json(doc);

    Hotel
        .findById(hotelId)
        .exec((err, doc) => {
            const response = {
                status: 200,
                data: doc
            };

            if (err) {
                console.log("Error finding the hotel.");
                response.status = 500;
                response.data = err;
            }
            else if (!doc) {
                response.status = 404;
                response.data = { "Message": "No hotels found." };
            }
            res.status(response.status).json(response.data);
        });
};

function _splitArray(input) {
    let output = [];
    if (input && input.length > 0) {
        output = input.split(';');
    }
    return output;
}

module.exports.postHotel = async function(req, res) {
    
    console.log(`${req.method} request to add hotel is made.`);

    Hotel
        .create({
            name: req.body.name,
            description: req.body.description,
            stars: parseInt(req.body.stars, 10),
            services: _splitArray(req.body.services),
            photos: _splitArray(req.body.photos),
            currency: req.body.currency,
            location: {
                address: req.body.address,
                coordinates: [parseFloat(req.body.long), parseFloat(req.body.lat)]
            }
        })
        .then(result => {
            console.log(`Adding the hotel succeeded`);
            res.status(201).json(result);
        })
        .catch(err => {
        res.status(400).json(err);
        });
};

module.exports.updateHotel = function(req, res) {
    const hotelId = req.params.hotelId;

    console.log(`${req.method} request to ${hotelId} hotel is made.`);

    Hotel
        .findById(hotelId)
        .select("-reviews -rooms")
        .exec((err, doc) => {
            const response = {
                status: 200,
                data: doc
            };

            if (err) {
                console.log("Error finding the hotel.");
                response.status = 500;
                response.data = err;
            }
            else if (!doc) {
                response.status = 404;
                response.data = { "Message": "No hotels found." };
            }
            if (response.status === 200) {
                doc.name = req.body.name;
                doc.description = req.body.description;
                doc.stars = parseInt(req.body.stars, 10);
                doc.services = _splitArray(req.body.services);
                doc.photos = _splitArray(req.body.photos);
                doc.currency = req.body.currency;
                doc.location = {
                    address: req.body.address,
                    coordinates: [parseFloat(req.body.long), parseFloat(req.body.lat)]
                };

                doc.save((err, hotelUpdated) => {
                    if (err) {
                        res.status(500).json(err);
                    }
                    else {
                        res.status(204).json();
                    }
                });
            }
            else {
                res.status(response.status).json(response.data);
            }
        });
};

module.exports.deleteHotel = function(req, res) {
    const hotelId = req.params.hotelId;

    console.log(`${req.method} request to ${hotelId} hotel is made.`);

    Hotel
        .findByIdAndRemove(hotelId)
        .exec((err, doc) => {
            if (err) {
                res.status(404).json(err);
            }
            else {
                console.log(`${hotelId} hotel successfully deleted.`);
                res.status(204).json();
            }
        });
};