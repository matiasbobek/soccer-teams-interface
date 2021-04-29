const db = require('better-sqlite3')('../data/teams.db');
const fs = require('fs');
const entities = require('./entities');

module.exports = {
  mapTeamsFromData: function mapTeamsFromData() {
    const teams = [];
    const data = db.prepare('SELECT * FROM soccer_teams');
    for (const team of data.iterate()) {
      teams.push(new entities.SoccerTeam(team.team_name, team.crest_url, team.crest_file, team.website, team.email, team.founded, team.club_colors, team.venue, team.tla));
    }
    return teams;
  },
  addTeamToData: function addTeamToData(team) {
    db.exec(`INSERT INTO soccer_teams (tla, team_name, crest_url, crest_file, website, email, founded, club_colors, venue) VALUES ('${team.tla}', '${team.name}', NULL, NULL, '${team.website}', '${team.email}',${team.founded},' ${team.clubColors}','${team.venue}' )  `);
    if (team.crestFileName) {
      db.exec(`UPDATE soccer_teams SET crest_file = '${team.crestFileName}' WHERE tla ='${team.tla}'`);
    }
  },

  modifyTeamInData: function modifyTeamInData(team) {
    db.exec(`UPDATE soccer_teams SET team_name = '${team.name}', crest_file = '${team.crestFileName}',website = '${team.website}', email= '${team.email}',founded=${team.founded},club_colors= '${team.clubColors}', venue= '${team.venue}' WHERE tla ='${team.tla}'`);
    if (team.crestFileName) {
      db.exec(`UPDATE soccer_teams SET crest_url=NULL WHERE tla ='${team.tla}'`);
      team.crestUrl = null;
    }
    return team;
  },
  deleteTeamFromData: function deleteTeamFromData(teamTla) {
    db.exec(`DELETE FROM soccer_teams WHERE tla = '${teamTla}'`);
  },
};
