/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable linebreak-style */

const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
const multer = require('multer');

const entities = require('./entities');
const api = require('./api');
const { Console } = require('console');
const { mapTeamsFromData } = require('./api');

const port = 8080;

const app = express();
const handlebars = exphbs.create();
const upload = multer({ dest: './uploads/team-crest' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/uploads`));

app.get('/', (req, res) => {
  const teamsData = JSON.parse(fs.readFileSync('../data/teams.json'));
  res.render('teams', {
    layout: 'main',
    data: {
      teams: api.mapTeamsFromData(teamsData),
    },
  });
});

app.post('/', upload.single('id'), (req, res) => {
  const teamTla = req.body.id;
  api.deleteTeamFromData(teamTla);

  const teamsData = JSON.parse(fs.readFileSync('../data/teams.json'));
  res.render('teams', {
    layout: 'main',
    data: {
      teams: api.mapTeamsFromData(teamsData),
    },
  });
});

app.get('/team', (req, res) => {
  const teams = api.mapTeamsFromData();
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
  res.render('./partials/form', {
    layout: 'main',
    data: {
    },
  });
});

app.post('/new-team', upload.single('crest'), (req, res) => {
  let fileName = null;
  let isError;
  const regEx = /^[a-z]*$/i;

  if (req.file) {
    fileName = req.file.filename;
  }

  const teams = api.mapTeamsFromData();
  const team = teams.find((item) => item.tla === req.body.id.toUpperCase());

  if (req.body.id.length === 3 && req.body.id.match(regEx) && !team) {
    const newTeam = new entities.SoccerTeam(req.body.name, null, fileName, req.body.website, req.body.email, req.body['foundation-year'], req.body.colors, req.body.venue, req.body.id.toUpperCase());
    api.addTeamToData(newTeam);
  } else {
    isError = true;
  }

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
      fileName,
      isError,
    },
  });
});

app.get('/modify', (req, res) => {
  const teamsData = JSON.parse(fs.readFileSync('../data/teams.json'));
  const teams = api.mapTeamsFromData(teamsData);
  const team = teams.find((item) => item.tla === req.query.tla);

  res.render('modify', {
    layout: 'main',
    data: {
      name: team.name,
      crestUrl: team.crestUrl,
      crestFileName: team.crestFileName,
      website: team.website,
      email: team.email,
      founded: team.founded,
      clubColors: team.clubColors,
      venue: team.venue,
      tla: team.tla,
    },
  });
});

app.post('/modify', upload.single('crest'), (req, res) => {
  let fileName = null;
  if (req.file) {
    fileName = req.file.filename;
  }

  const Team = new entities.SoccerTeam(req.body.name, null, fileName, req.body.website, req.body.email, req.body['foundation-year'], req.body.colors, req.body.venue, req.body.id);
  const modifiedTeam = api.modifyTeamInData(Team);
  
  res.render('modify', {
    layout: 'main',
    data: {
      id: req.body.id,
      name: req.body.name,
      website: req.body.website,
      foundationYear: req.body['foundation-year'],
      colors: req.body.colors,
      venue: req.body.venue,
      email: req.body.email,
      fileName,
      crestUrl: modifiedTeam.crestUrl,
      crestFileName: modifiedTeam.crestFileName,
      message: 'The team has been successfully modified',
    },
  });
});

console.log(`i'm listening at http://localhost:${port}`);

app.listen(port);
