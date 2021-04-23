/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable linebreak-style */

const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
const multer = require('multer');

const entities = require('./entities');

const port = 8080;

const app = express();
const handlebars = exphbs.create();
const upload = multer({ dest: './uploads/team-crest' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

function mapsAPITeams(teamsAPI) {
  const teams = [];
  teamsAPI.forEach((team) => {
    teams.push(new entities.SoccerTeam(team.name, team.crestUrl, team.website, team.email, team.founded, team.clubColors, team.venue, team.tla));
  });
  return (teams);
}

app.use(express.static(`${__dirname}/uploads`));

app.get('/', (req, res) => {
  const teamsAPI = JSON.parse(fs.readFileSync('../data/teams.json'));
  res.render('teams', {
    layout: 'main',
    data: {
      teams: mapsAPITeams(teamsAPI),
    },
  });
});

app.get('/team', (req, res) => {
  const teamsAPI = JSON.parse(fs.readFileSync('../data/teams.json'));
  const teams = mapsAPITeams(teamsAPI);
  const team = teams.find((item) => item.tla === req.query.tla);

  res.render('team', {
    layout: 'main',
    data: {
      name: team.name,
      crestUrl: team.crestUrl,
      website: team.website,
      email: team.email,
      foundationYear: team.foundationYear,
      colors: team.colors,
      venue: team.venue,
    },
  });
});

app.get('/new-team', (req, res) => {
  // const teamsAPI = JSON.parse(fs.readFileSync('../data/teams.json'));
  // const teams = mapsAPITeams(teamsAPI);
  // const team = teams.find((item) => item.tla === req.query.tla);

  res.render('new-team', {
    layout: 'main',
    data: {
    },
  });
});

app.post('/new-team', upload.single('crest'), (req, res) => {
  res.render('new-team', {
    layout: 'main',
    data: {
      id: req.body.id,
      name: req.body.name,
      website: req.body.website,
      foundationYear: req.body['foundation-year'],
      colors: req.body.colors,
      venue: req.body.venue,
      fileName: req.file.filename,
      message: 'The team has been successfully created',
    },
  });
});

console.log(`i'm listening at http://localhost:${port}`);

app.listen(port);
