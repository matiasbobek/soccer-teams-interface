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
  res.render('teams', {
    layout: 'main',
    data: {
      name: 'pepe',
    },
  });

  //task: creates a object with the information of teams.json
 /* fetch('data/teams.json')
    .then((teams) => teams.json())
    .then((teamsJSON) => console.log(teamsJSON));
*/

});

console.log(`i'm listening at http://localhost:${port}`);

app.listen(port);
