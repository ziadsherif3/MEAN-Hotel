const MongoClient = require('mongodb').MongoClient;
const dburl = `mongodb://localhost:27017/meanhotel`; // The connection string

let _connection = null;

function open() {
    MongoClient.connect(dburl, (err, db) => {
        if (err) {
            console.log(`Connection to the database failed.`);
            return;
        }
        _connection = db;
        console.log(`Connection with database successful.`);
    });
}

function get() {
    return _connection;
}

module.exports = {open, get}