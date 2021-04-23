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

// put those in "api.js"
function mapTeamsFromData() {
  const teamsData = JSON.parse(fs.readFileSync('../data/teams.json'));
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

function modifyTeamInData(team) {
  const teamsData = JSON.parse(fs.readFileSync('../data/teams.json'));
  const teams = [];
  teamsData.forEach((dataTeam) => {
    if (team.tla === dataTeam.tla) {
      if (team.crestFileName) {
        team.crestUrl = null;
      } else {
        team.crestUrl = dataTeam.crestUrl;
      }
      teams.push(team);
    } else {
      teams.push(dataTeam);
    }
  });
  fs.writeFileSync('../data/teams.json', JSON.stringify(teams));
  return team;
}

function deleteTeamFromData(teamTla) {
  const teamsData = JSON.parse(fs.readFileSync('../data/teams.json'));
  const teams = [];
  teamsData.forEach((dataTeam) => {
    if (teamTla === dataTeam.tla) {
    } else {
      teams.push(dataTeam);
    }
  });
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

app.post('/', upload.single('id'), (req, res) => {
  const teamTla = req.body.id;
  deleteTeamFromData(teamTla);

  const teamsData = JSON.parse(fs.readFileSync('../data/teams.json'));
  res.render('teams', {
    layout: 'main',
    data: {
      teams: mapTeamsFromData(teamsData),
    },
  });
});

app.get('/team', (req, res) => {
  const teams = mapTeamsFromData();
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
  res.render('new-team', {
    layout: 'main',
    data: {
    },
  });
});

app.post('/new-team', upload.single('crest'), (req, res) => {
  let fileName = null;
  if (req.file) {
    fileName = req.file.filename;
  }

  const newTeam = new entities.SoccerTeam(req.body.name, null, fileName, req.body.website, req.body.email, req.body['foundation-year'], req.body.colors, req.body.venue, req.body.id);
  addTeamToData(newTeam);

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
      message: 'The team has been successfully created',
    },
  });
});

app.get('/modify', (req, res) => {
  const teamsData = JSON.parse(fs.readFileSync('../data/teams.json'));
  const teams = mapTeamsFromData(teamsData);
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
  const modifiedTeam = modifyTeamInData(Team);
  console.log(modifiedTeam);

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
