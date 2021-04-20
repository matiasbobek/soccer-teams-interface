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

const upload = multer({ dest: './uploads/team-logo' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

function mapsAPITeams(teamsAPI) {
  const teams = [];
  teamsAPI.forEach((team) => {
    teams.push(new entities.SoccerTeam(team.name, team.crestUrl, team.website, team.email, team.founded, team.clubColors, team.venue, team.tla));
  });
  return (teams);
}

function searchTeamFromTla(teams, tla) {
  let selectedTeam;
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].tla === tla) {
      selectedTeam = teams[i];
    }
    return selectedTeam;
  }
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

app.get('/:tla', (req, res) => {
  const teamsAPI = JSON.parse(fs.readFileSync('../data/teams.json'));
  const teams = mapsAPITeams(teamsAPI);
  const team = searchTeamFromTla(teams, req.params.tla);

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

console.log(`i'm listening at http://localhost:${port}`);

app.listen(port);
