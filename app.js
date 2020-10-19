const express = require('express');
const app = express(); // The top-level function of the express application.
const path = require('path');

const routes = require('./api/routes');

app.set('port', 3000);

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api', routes);

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () => {
    const port = server.address().port;
    console.log(`This is port ${port}`);
});