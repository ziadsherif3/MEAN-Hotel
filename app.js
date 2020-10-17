const express = require('express');
const app = express(); // The top-level function of the express application.

app.set('port', 3000);

const server = app.listen(app.get('port'), () => {
    const port = server.address().port;
    console.log(`This is port ${port}`);
});