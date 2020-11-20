const mongoose = require('mongoose');
const dburl = `mongodb://localhost/meanhotel`; // The connection string

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

// mongoose.connection.on('connected', () => {
//     console.log('Mongoose connected to database at ', dburl);
// });

mongoose.connection.once('open', () => {
    console.log('Mongoose: Connected to database at ', dburl);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose: Disconnected from the database.');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose error: ', err);
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose: Connection closed successfully.');
        process.exit(0);
    });
});

/** Not working in windows. */

// process.once('SIGUSR2', () => {
//     mongoose.connection.close(() => {
//         console.log('Mongoose: Connection closed successfully.');
//         process.kill(process.pid, 'SIGUSR2');
//     });
// });

/** Import hotels.model.js */

require('./hotels.model.js');
require('./user.model.js');