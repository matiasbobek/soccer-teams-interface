/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const fs = require('fs');
const entities = require('./entities');

module.exports = {
  mapTeamsFromData: function mapTeamsFromData() {
    const teamsData = JSON.parse(fs.readFileSync('../data/teams.json'));
    const teams = [];
    teamsData.forEach((team) => {
      teams.push(new entities.SoccerTeam(team.name, team.crestUrl, team.crestFileName, team.website, team.email, team.founded, team.clubColors, team.venue, team.tla));
    });
    return (teams);
  },
  addTeamToData: function addTeamToData(team) {
    const teamsData = JSON.parse(fs.readFileSync('../data/teams.json'));
    const teams = [];
    teamsData.forEach((dataTeam) => {
      teams.push(dataTeam);
    });
    teams.push(team);
    fs.writeFileSync('../data/teams.json', JSON.stringify(teams));
  },
  modifyTeamInData: function modifyTeamInData(team) {
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
  },
  deleteTeamFromData: function deleteTeamFromData(teamTla) {
    const teamsData = JSON.parse(fs.readFileSync('../data/teams.json'));
    const teams = teamsData.filter((team) => teamTla !== team.tla);

    fs.writeFileSync('../data/teams.json', JSON.stringify(teams));
  },
};
