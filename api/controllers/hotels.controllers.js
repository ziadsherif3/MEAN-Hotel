const hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
    console.log(`${req.method} request to hotels is made.`);
    res.status(200).json(hotelData);
}

module.exports.getHotel = function(req, res) {
    const hotelID = req.params.hotelID;
    console.log(`${req.method} request to ${hotelID} hotel is made.`);
    res.status(200).json(hotelData[hotelID]);
}