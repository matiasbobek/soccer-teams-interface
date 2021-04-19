/* eslint-disable linebreak-style */

const express = require('express');

const port = 8080;

const app = express();

app.get('/', (req, res) => {
  res.end('Hello world');
});

console.log(`i'm listening at http://localhost:${port}`);

app.listen(port);
