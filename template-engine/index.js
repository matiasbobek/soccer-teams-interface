/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable linebreak-style */

const express = require('express');
const exphbs = require('express-handlebars');

const port = 8080;

const app = express();
const handlebars = exphbs.create();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('main'), {
    layout: 'main',
  };
});

console.log(`i'm listening at http://localhost:${port}`);

app.listen(port);
