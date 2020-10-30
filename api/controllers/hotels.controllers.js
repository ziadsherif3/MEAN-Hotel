const dbConn = require('../data/dbconnection');
const ObjectId = require('mongodb').ObjectId;

module.exports.hotelsGetAll = async function(req, res) {
    const db = dbConn.get();
    const collection = db.collection('hotels');

    let offset = 0;
    let count = 5;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    console.log(`${req.method} request to hotels is made.`);

    const docs = await collection
                            .find()
                            .skip(offset)
                            .limit(count)
                            .toArray();
    
    res.status(200).json(docs);
}

module.exports.getHotel = async function(req, res) {
    const db = dbConn.get();
    const collection = db.collection('hotels');

    const hotelId = req.params.hotelId;

    console.log(`${req.method} request to ${hotelId} hotel is made.`);

    const doc = await collection
                                .findOne({"_id": ObjectId(hotelId)});
    res.status(200).json(doc);
}

module.exports.postHotel = async function(req, res) {
    const db = dbConn.get();
    const collection = db.collection('hotels');

    console.log(`${req.method} request to add hotel is made.`);

    if (req.body && req.body.name && req.body.stars) {
        const newHotel = req.body;

        newHotel.stars = parseInt(req.body.stars, 10);

        const result = await collection.insertOne(newHotel);

        console.log(`Adding the hotel succeeded`);
        res.status(201).json(result);
    }
    else {
        console.log(`Adding the hotel failed`);
        res.status(400).json({message: "Data missing from the body."});
    }
}