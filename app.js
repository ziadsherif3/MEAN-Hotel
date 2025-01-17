require('./api/data/db');

const express = require('express');
const app = express(); // The top-level function of the express application.
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./api/routes');

app.set('port', 3000);

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', routes);

const server = app.listen(process.env.PORT || app.get('port'), () => {
    const port = server.address().port;
    console.log(`This is port ${port}`);
});