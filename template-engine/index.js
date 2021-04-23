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

function mapTeamsFromData(teamsData) {
  const teams = [];
  teamsData.forEach((team) => {
    teams.push(new entities.SoccerTeam(team.name, team.crestUrl, team.crestFileName, team.website, team.email, team.founded, team.clubColors, team.venue, team.tla));
  });
  return (teams);
}

function addTeamToData(team) {
  const teamsData = JSON.parse(fs.readFileSync('../data/teams.json'));
  const teams = [];
  teamsData.forEach((dataTeam) => {
    teams.push(dataTeam);
  });
  teams.push(team);
  fs.writeFileSync('../data/teams.json', JSON.stringify(teams));
}

app.use(express.static(`${__dirname}/uploads`));

app.get('/', (req, res) => {
  const teamsData = JSON.parse(fs.readFileSync('../data/teams.json'));
  res.render('teams', {
    layout: 'main',
    data: {
      teams: mapTeamsFromData(teamsData),
    },
  });
});

app.get('/team', (req, res) => {
  const teamsData = JSON.parse(fs.readFileSync('../data/teams.json'));
  const teams = mapTeamsFromData(teamsData);
  const team = teams.find((item) => item.tla === req.query.tla);

  res.render('team', {
    layout: 'main',
    data: {
      name: team.name,
      crestUrl: team.crestUrl,
      crestFileName: team.crestFileName,
      website: team.website,
      email: team.email,
      foundationYear: team.founded,
      colors: team.clubColors,
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
  const newTeam = new entities.SoccerTeam(req.body.name, null, req.file.filename, req.body.website, req.body.email, req.body['foundation-year'], req.body.colors, req.body.venue, req.body.id);
  addTeamToData(newTeam);
  console.log(newTeam);
  res.render('new-team', {
    layout: 'main',
    data: {
      id: req.body.id,
      name: req.body.name,
      website: req.body.website,
      foundationYear: req.body['foundation-year'],
      colors: req.body.colors,
      venue: req.body.venue,
      email: req.body.email,
      fileName: req.file.filename,
      message: 'The team has been successfully created',
    },
  });
});

console.log(`i'm listening at http://localhost:${port}`);

app.listen(port);
