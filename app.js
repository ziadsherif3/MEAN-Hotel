const express = require('express');
const app = express(); // The top-level function of the express application.
const path = require('path');

app.set('port', 3000);

app.get('/', (req, res) => {
    console.log(`GET request to homepage is made.`);
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/json', (req, res) => {
    console.log(`GET request to json is made.`);
    res.status(200).json({ "name": "Ziad", "age": 22 });
});

app.get('/file', (req, res) => {
    console.log(`GET request to file is made.`);
    res.status(200).sendFile(path.join(__dirname, ''));
});

const server = app.listen(app.get('port'), () => {
    const port = server.address().port;
    console.log(`This is port ${port}`);
});