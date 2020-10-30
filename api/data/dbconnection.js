const MongoClient = require('mongodb').MongoClient;
const dburl = `mongodb://localhost:27017`; // The connection string

let _connection = null;

function open() {
    MongoClient.connect(dburl, (err, client) => {
        if (err) {
            console.log(`Connection to the database server failed.`);
            return;
        }
        _connection = client.db('meanhotel');
        console.log(`Connection with database successful.`);
    });
}

function get() {
    return _connection;
}

module.exports = {open, get}