const dbConn = require('../data/dbconnection');
const hotelsData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
    let offset = 0;
    let count = 5;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    const slicedData = hotelsData.slice(offset, offset + count);

    console.log(`${req.method} request to hotels is made.`);
    res.status(200).json(slicedData);
}

module.exports.getHotel = function(req, res) {
    const hotelID = req.params.hotelID;
    console.log(`${req.method} request to ${hotelID} hotel is made.`);
    res.status(200).json(hotelsData[hotelID]);
}

module.exports.postHotel = function(req, res) {
    console.log(`${req.method} request to add hotel is made.`);
    res.status(200).json(req.body);
}