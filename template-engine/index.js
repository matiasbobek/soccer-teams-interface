/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable linebreak-style */

class SoccerTeam {
  constructor(name, crestUrl) {
    this.name = name;
    this.crestUrl = crestUrl;
  }
}

function mapsTeams(teamsAPI) {
  const teams = [];
  teamsAPI.forEach((team) => {
    teams.push(new SoccerTeam(team.name, team.crestUrl));
  });
  return (teams);
}

const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
const multer = require('multer');

const port = 8080;

const app = express();
const handlebars = exphbs.create();

const upload = multer({ dest: './uploads/team-logo' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/uploads`));

app.get('/', (req, res) => {
  const teams = JSON.parse(fs.readFileSync('../data/teams.json'));
  console.log(mapsTeams(teams));
  res.render('teams', {
    layout: 'main',
    data: {
      teams: mapsTeams(teams),
    },
  });
});

console.log(`i'm listening at http://localhost:${port}`);

app.listen(port);
